import messageController from '../controller/messageController';
import { Router } from 'express';

const router = Router();

router.post('/', messageController.message);  //
router.get('/ofachat', messageController.getallmessagesofChat);  //
router.delete('/:id', messageController.deletemessage);  //
router.get('/', messageController.getall);  //

export default router;