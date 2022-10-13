import userController from '../controller/userController';
import { Router } from 'express';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile/:id', userController.profile);
router.get('/', userController.getall);
router.get('/:id', userController.getone);
router.put('/forgotpass/:id', userController.changePass); // no va bé
router.put('/update/:id', userController.update);

export default router;