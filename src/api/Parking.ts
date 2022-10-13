import parkingController from '../controller/parkingController';
import { Router } from 'express';

const router = Router();

router.post('/register', parkingController.register);
router.delete('/cancel', parkingController.cancel);
router.get('/', parkingController.getall);
//  Falta el put!

export default router;