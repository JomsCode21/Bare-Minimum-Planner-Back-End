import { Request, Response} from "express";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ForgotPassword } from "@/utils/ForgotPassword";


const generateToken = (res: Response, userId: any) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("FATAL ERROR: JWT_SECRET is not defined.");
    }

    const token = jwt.sign({ id: userId }, secret , {
        expiresIn: "30d",
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false, // Set to 'false' for localhost (HTTP), 'true' for production (HTTPS)
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

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

export const loginUser = async (req: Request, res: Response) => {
    const jwt = require('jsonwebtoken');
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

export const findUser = async (req: Request, res:Response) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found registered in this email."});
        }

        const resetLink = `http://localhost:5173/resetpassword?id=${user._id}`;

        await ForgotPassword(user.email, resetLink);

        return res.status(200).json({
            message: "User found",
            userId: user._id
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}


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

export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });

    return res.status(200).json({message: "Logged out successfully. "});
}