import { Request, Response } from "express";
import { sendMail } from "../utils/mailer";
import { CreateUserPayload } from "./user.schema";
import { createUser } from "./user.service";
import config from 'config';

const email = config.get<string>('user');

export const createUserHandler = async (req: Request<{}, {}, CreateUserPayload>, res: Response) => {
    const user = req.body;
    try {
        const createdUser = await createUser(user);
        await sendMail({
            from: `${email}`,
            to: user.email,
            subject: `Please verify your account`,
            text: `Verification code ${createdUser.verificationCode}. Id: ${createdUser._id}`
        });
        return res.send("User successfully created"); 
    } catch (err: any) {
        if(err.code === 11000) {
            return res.status(409).send('Account already exists');
        }
        return res.status(400).send(err);
    }
}