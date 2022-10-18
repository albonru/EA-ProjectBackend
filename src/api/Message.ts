import messageController from '../controller/messageController';
import { Router } from 'express';

const router = Router();

router.post('/message', messageController.message);  // OK
router.get('/ofachat', messageController.getallmessagesofChat);  // OK
router.get('/delete/:id', messageController.deletemessage);  // OK
router.get('/', messageController.getall);  // OK
export default router;