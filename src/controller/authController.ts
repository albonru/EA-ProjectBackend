import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import User from '../model/User';
import jwt from "jsonwebtoken";
import IJwtPayload from '../model/JWTPayload';

const _SECRET: string = 'clavesecreta';

export async function login (req: Request, res: Response): Promise<Response> {
    const email = req.body.email;
    const password = req.body.password;
try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User Not Found ", userFound, email, password });
    if (userFound.deleted) return res.status(402).json({ message: "Deactivated User" })
    const validPassword = CryptoJS.AES.decrypt(userFound.password as string, 'secret key 123').toString(CryptoJS.enc.Utf8);
    const index = validPassword.localeCompare(password);
    if (index === 0) {
        const session = { 'user_id': userFound.id } as IJwtPayload;

        const token = jwt.sign(session, _SECRET, {
            expiresIn: 86400, // 24 hours
        });
        const id = userFound.id;
        return res.json({ auth: true, token, id });
    }
    return res.status(401).json({ auth: false, token: null });
    }
    catch(err) {
        res.status(404).send('Cant find user');
    }
};