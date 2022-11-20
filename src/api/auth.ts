import { Router } from "express";
import * as authCtrl from "../controller/authController";

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/login", authCtrl.login);

export default router;