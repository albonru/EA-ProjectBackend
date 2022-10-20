import chatController from '../controller/chatController';
import { Router } from 'express';

const router = Router();

router.post('/chat', chatController.create);  // OK
router.get('/:id', chatController.getone);  // OK
router.get('/', chatController.getall);  // OK
export default router;