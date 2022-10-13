import chatController from '../controller/chatController';
import { Router } from 'express';

const router = Router();

router.post('/chat', chatController.create);
router.get('/:id', chatController.getallmessagesById);
router.get('/:id', chatController.getone);
export default router;