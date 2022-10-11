import bookingController from '../controller/bookingController';
import { Router } from 'express';

const router = Router();

router.post('/book', bookingController.book);
router.delete('/cancel', bookingController.cancel);
router.get('/', bookingController.getall);
router.get('/:id', bookingController.getone);

export default router;