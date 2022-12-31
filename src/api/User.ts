import userController from '../controller/userController';
import { Router } from 'express';
import { verifyToken, isOwner, istheUser } from '../middlewares/authJWT'

const router = Router();

router.post('/', userController.register); // OK
router.get('/:id', [verifyToken], userController.profile); // OK
router.get('/', userController.getall);  // OK
router.put('/changepass', userController.changePass); // OK
router.put('/updateName', [verifyToken], userController.updateName); // OK
router.put('/updateEmail', [verifyToken], userController.updateEmail); // OK
router.put('/activate', userController.activate); // OK
router.delete('/', [verifyToken], userController.deleteUser); // OK
router.put('/checkemail', userController.checkemail); // OK

export default router;