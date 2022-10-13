import messageController from '../controller/messageController';
import { Router } from 'express';

const router = Router();

router.post('/message', messageController.message);
router.get('/cancel', messageController.cancel);
export default router;