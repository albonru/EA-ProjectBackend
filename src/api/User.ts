import userController from '../controller/userController';
import { Router } from 'express';

const router = Router();

// ALL OK NO VERIFY
router.post('/register', userController.register); // OK
router.post('/login', userController.login); // OK
router.get('/profile/:id', userController.profile); // OK
router.get('/', userController.getall); // OK
router.get('/parkings/:id', userController.getParkings); // OK
router.get('/bookings/:id', userController.getBookings); // OK
router.get('/opinions/:id', userController.getOpinions); // OK
router.get('/favorites/:id', userController.getFavorites); // OK
router.put('/forgotpass/:id', userController.changePass); // OK
router.put('/update/:id', userController.update); // OK
router.delete('/delete/:id', userController.deleteUser); // OK

export default router;