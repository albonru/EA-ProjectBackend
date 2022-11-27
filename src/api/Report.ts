import reportController from '../controller/reportController';
import { Router } from 'express';

const router = Router();

router.post('/', reportController.create); // OK
router.get('/', reportController.getall); // OK
router.get('/:id', reportController.getone); // OK
router.get('/byUser/:id', reportController.getByUser); // OK
router.put('/:id', reportController.edit); // OK
router.put('/status/:id', reportController.changeStatus); // OK
router.delete('/:id', reportController.deleteReport); // OK

export default router;