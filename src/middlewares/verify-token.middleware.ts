import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/user.model";

export interface AuthRequest extends Request {
    user?: any;
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {

    // Getting the token
    const token = req.cookies.jwt;

    if(!token) {
        return res.status(401).json({ isAuthenticated: false, message: "No token provided."});
    }

    try {
        // Verify the token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await UserModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ isAuthenticated: false, message: "User not found"});
        }

        // Attaching user info to the request object
        req.user = user;

        next();
    } catch (error) {
        return res.status(403).json({ isAuthenticated: false, message: "Invalid token"});
    }
};