import addressController from '../controller/addressController';
import { Router } from 'express';

const router = Router();

router.post('/create', addressController.create);
router.get('/', addressController.getall);
router.get('/:id', addressController.getone); //address d'un user
//router.put('/update/:id', addressController.changeStreet);
router.delete('/delete/:id', addressController.cancel);

export default router;