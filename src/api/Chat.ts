import chatController from '../controller/chatController';
import { Router } from 'express';

const router = Router();

router.post('/', chatController.create);  //
router.get('/:id', chatController.getone);  //
router.get('/', chatController.getall);  //

export default router;