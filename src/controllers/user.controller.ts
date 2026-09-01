import { Request, Response} from "express";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ForgotPassword } from "@/utils/ForgotPassword";
import { AuthRequest } from "@/middlewares/verify-token.middleware";
import axios from "axios";

// Helper function to generate JWT token and set it as a cookie
const generateToken = (res: Response, userId: any) => {
    const secret = process.env.JWT_SECRET;
    const isProduction = process.env.NODE_ENV === "production";

    if (!secret) {
        throw new Error("FATAL ERROR: JWT_SECRET is not defined.");
    }

    const token = jwt.sign({ id: userId }, secret , {
        expiresIn: "30d",
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

// Google Login
export const googleLogin = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Google Token is required" });
        }

        // Send the token to Google for verification
        const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const { email, name } = googleResponse.data;

        // Check if the user already exists in the database
        let user: any = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({
                name: name,
                email: email,
                password: Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10), // Generate a random password for Google users
            });
        }

        // Use your helper function to generate the exact same cookie! 
        generateToken(res, user._id);

        // Send response back to the client matching loginUser structure
        res.status(200).json({
            message: "Google login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error: any) {
        console.error("Google login error:", error.response?.data || error.message || error);
        res.status(500).json({ message: "Error during Google login", error: error.response?.data || error.message || error });
    }
};

// Check if email is already registered
export const checkEmail = async (req: Request, res: Response) => {
    try {
        // Checking if the user already exist
        const { email } = req.body;
        const userExist = await UserModel.findOne({email });

        return res.status(200).json({ exists: !!userExist });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// User Registration
export const registerUser = async (req: Request, res: Response) => {
    try{
        const { name, email, password } = req.body;

        // Checking if the user already exist
        const userExist = await UserModel.findOne({email });
        if (userExist) return res.status(400).json({ message: "User already exist!"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({ name, email, password: hashedPassword });
        res.status(201).json({
            mesage: "User registered.", user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            } 
        });
    } catch(error) {
        res.status(500).json({ message: "Error registering" });
    }
};

// User Login
export const loginUser = async (req: Request, res: Response) => {
   
    try {
        const { email, password } = req.body;
        const user: any = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password || "");
        if (!isMatch) {
            return res.status(400).json( { message: "Invalid credentials"});
        }

        generateToken(res, user._id);
        res.status(200).json({
            message: "Login sucessful",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error});
    }
};

// Get all users (for testing purposes)
export const getAllUser = async (req:Request, res: Response) => {
    try {
        const user = await UserModel.find();
        if (!user || user.length === 0) {
            res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

// Forgot Password
export const findUser = async (req: Request, res:Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(200).json({
                message: "If an account exists for this email, a reset link has been sent.",
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.passwordResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        user.passwordResetExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();

        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        const resetLink = `${frontendUrl}/resetpassword?token=${resetToken}`;

        await ForgotPassword(user.email, resetLink);

        return res.status(200).json({
            message: "If an account exists for this email, a reset link has been sent.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}

// Reset Password (uses a short-lived, single-use token sent by email)
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const token = Array.isArray(req.params.token)
            ? req.params.token[0]
            : req.params.token;
        const { password } = req.body;

        if (!token || !password || typeof password !== "string" || password.length < 8) {
            return res.status(400).json({
                message: "The reset link or password is invalid.",
            });
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await UserModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpiresAt: { $gt: new Date() },
        }).select("+passwordResetToken +passwordResetExpiresAt");

        if (!user) {
            return res.status(400).json({
                message: "This password reset link is invalid or has expired.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.passwordResetToken = undefined;
        user.passwordResetExpiresAt = undefined;
        await user.save();

        return res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error resetting password." });
    }
};

// Save or refresh the current browser/device push subscription.
export const savePushSubscription = async (req: AuthRequest, res: Response) => {
    try {
        const { endpoint, expirationTime, keys } = req.body;

        if (
            !endpoint ||
            typeof endpoint !== "string" ||
            !keys?.p256dh ||
            !keys?.auth
        ) {
            return res.status(400).json({ message: "Invalid push subscription." });
        }

        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.pushSubscriptions = user.pushSubscriptions.filter(
            (subscription) => subscription.endpoint !== endpoint,
        );
        user.pushSubscriptions.push({
            endpoint,
            expirationTime: typeof expirationTime === "number" ? expirationTime : null,
            keys: { p256dh: keys.p256dh, auth: keys.auth },
        });
        await user.save();

        return res.status(201).json({ message: "Push notifications enabled." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not save push subscription." });
    }
};

// Update User Info
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {name, email, password} = req.body;

        // Finding if user is true
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found."});
        }

        // Email Update (checking for duplicate)
        if (email && email !== user.email) {
            const emailExist = await UserModel.findOne({email});
            if (emailExist) {
                return res.status(400).json({message: "Email already registered."});
            }
            user.email = email;
        }

        // Updating name
        if (name) user.name = name;

        //Updating password 
        if(password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword
        }

        // Saving the updated info of user
        const updatedUser = await user.save();

        // Returning success
        res.status(200).json({
            message: "User update sucessfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error updating user info"});
    }
};

// User Logout
export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });

    return res.status(200).json({message: "Logged out successfully. "});
}

// Check Authentication
export const checkAuth = (req: AuthRequest, res: Response) => {
    
    return res.status(200).json({
        isAuthenticated: true,
        user: req.user
    });
};
