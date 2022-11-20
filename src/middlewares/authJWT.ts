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
    req.params.id = decoded.id;
    req.params.email = String(decoded.email);
    req.params.type = String(decoded.type);
    req.params.price = String(decoded.price);
    req.params.size = String(decoded.size);
    req.params.difficulty = String(decoded.difficulty);
    req.params.country = String(decoded.country);
    req.params.city = String(decoded.city);
    req.params.street = String(decoded.street);
    req.params.streetNumber = String(decoded.streetNumber);
    req.params.spotNumber = String(decoded.spotNumber);
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
    const user = await User.findById(req.params.user_id);
    const parking = await Parking.findById(req.params.id);

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