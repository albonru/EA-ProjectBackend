import userController from '../controller/userController';
import { Router } from 'express';
import { verifyToken, isOwner, istheUser } from '../middlewares/authJWT'

const router = Router();

// FALTA VERIFY
router.post('/', userController.register); // OK
router.get('/:id', [verifyToken, istheUser], userController.profile); // OK
router.get('/', userController.getall);  // OK
router.put('/changepass', userController.changePass); // OK
router.put('/update', [verifyToken, istheUser], userController.update); // OK
router.put('/activate', userController.activate); // OK
router.delete('/', [verifyToken, istheUser], userController.deleteUser); // OK

export default router;