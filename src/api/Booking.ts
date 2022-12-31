import bookingController from '../controller/bookingController';
import { Router } from 'express';
import { isOwner, verifyToken } from '../middlewares/authJWT';

const router = Router();

router.post('/', [verifyToken], bookingController.book);  // OK
router.delete('/', [verifyToken], bookingController.cancel); // OK
router.get('/', bookingController.getall); // OK
router.get('/:id', bookingController.getone); // OK

export default router;