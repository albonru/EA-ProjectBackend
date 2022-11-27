import bookingController from '../controller/bookingController';
import { Router } from 'express';

const router = Router();

// FALTA FER VERIFY
router.post('/', bookingController.book);  // OK
router.delete('/:id', bookingController.cancel); // OK
router.get('/', bookingController.getall); // OK
router.get('/:id', bookingController.getone); // OK

export default router;