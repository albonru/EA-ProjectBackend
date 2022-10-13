import bookingController from '../controller/bookingController';
import { Router } from 'express';

const router = Router();

// NO VERIFY
router.post('/book', bookingController.book);  // OK
router.delete('/cancel/:id', bookingController.cancel); // OK
router.get('/', bookingController.getall); // OK
router.get('/:id', bookingController.getone); // OK

export default router;