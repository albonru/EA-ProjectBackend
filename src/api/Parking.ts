import parkingController from '../controller/parkingController';
import { Router } from 'express';

const router = Router();

<<<<<<< HEAD
router.post('/register', parkingController.register);
=======
router.post('/parking', parkingController.register);
>>>>>>> 683963dd5da837817e324b7c32003520b86dc096
router.delete('/cancel', parkingController.cancel);
router.get('/', parkingController.getall);
//  Falta el put!

export default router;