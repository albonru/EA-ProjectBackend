import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";
import User from "../model/User";
import Parking from "../model/Parking";
import IJwtPayload from '../model/JWTPayload';

const _SECRET: string = 'clavesecreta';

export async function verifyToken (req: Request, res: Response, next: NextFunction) {
    const token = req.header("x-access-token");
    if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, _SECRET) as IJwtPayload;
    req.params.user_id = decoded.user_id;
    const user = await User.findById(req.params.user_id, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export async function isOwner (req: Request, res: Response, next: NextFunction) {
  try {
    const { _id } = req.body;
    const user = await User.findById(req.params.user_id);
    const parking = await Parking.findById(_id);

    if (!parking) {return res.status(403).json({ message: "No parking found" })};
const comp = String(parking.user);
const result = comp.localeCompare(user.id);
if(result === 0) {next();}
else {return res.status(403).json({ message: "Not Owner, parking.user = '" + comp + "' & user id = '" + user.id + "', result = " + result + "'"})};
  }
  catch (error) {
    return res.status(500).send({ message: error });
  }
};

export async function istheUser (req: Request, res: Response, next: NextFunction) {
  try {
    const { user_id } = req.body;
    const comp1 = String(req.params.user_id);
    const comp2 = String(user_id);
    const equals = comp1.localeCompare(comp2);
    if (equals === 0) { next(); }
    else {
      return res.status(403).json({ message: "Not the same user" });
    }
  }
  catch (error) {
    return res.status(500).send({ message: error });
  }
};