import userController from '../controller/userController';
import { Router } from 'express';

const router = Router();

// FALTA VERIFY
router.post('/register', userController.register); // OK
router.post('/login', userController.login); // OK
router.get('/:id', userController.profile); // OK
router.get('/', userController.getall);  // OK
router.put('/forgotpass/:id', userController.changePass); // OK
router.put('/update/:id', userController.update); // OK
router.delete('/:id', userController.deleteUser); // OK

export default router;