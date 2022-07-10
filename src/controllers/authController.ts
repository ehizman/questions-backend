import {NextFunction, Request, Response} from "express";
import {ILoginRequest, IRegistrationRequest} from "./authController.interface";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req: Request, res: Response, next: NextFunction)=> {
    const registrationRequest: IRegistrationRequest = req.body;
    try {
        const newUser = await User.create({
            email: registrationRequest.email,
            password: registrationRequest.password,
            username: registrationRequest.username,
            firstname: registrationRequest.firstname,
            lastname: registrationRequest.lastname,
            active: false,
        });

        res.status(201).json({
            success: true,
            timestamp: Date.now(),
            user: newUser,
        });

    } catch (e: unknown) {
        const error = e as Error;
        console.log(error.message);
        res.status(400).json({
            success: false,
            timestamp: Date.now(),
            message: error.message,
        });
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const loginRequest: ILoginRequest = req.body;

    try {
        if (!loginRequest.username || !loginRequest.password){
            throw new Error("email and password must be provided");
        }
        const user = await User.findOne({username: loginRequest.username});
        if (!user){
            throw new Error("No user found with username");
        }

        const passwordMatch: boolean =  await bcrypt.compare(loginRequest.password, user.password);
        if (!passwordMatch){
            throw new Error("incorrect password provided");
        }
        const token = signToken(user._id.toString());
        res.status(200)
            .json({
                success: true,
                timestamp: new Date(),
                token
            });
    } catch(e: unknown){
        const error: Error = e as Error;
        console.log(error.message);
        res.status(400)
            .json({
                success: false,
                timestamp: Date.now(),
                message: error.message,
            });

    }
}

const signToken = (id: string) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    const expiryTime = process.env.JWT_EXPIRES_IN as string;

    return jwt.sign({id}, jwtSecret, {expiresIn: expiryTime});
}

