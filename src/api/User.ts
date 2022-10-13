import userController from '../controller/userController';
import { Router } from 'express';

const router = Router();

// ALL OK NO VERIFY
router.post('/register', userController.register); // OK
router.post('/login', userController.login); // OK
router.get('/profile/:id', userController.profile); // OK
router.get('/', userController.getall); // OK
router.put('/forgotpass/:id', userController.changePass); // OK
router.put('/update/:id', userController.update); // OK
router.delete('/delete/:id', userController.deleteUser); // OK
// router.put('/addParking', userController.addParking);
// router.put('/addBooking', userController.addBooking);
// router.put('/addOpinion', userController.addOpinion);
// router.put('/addFavorite', userController.addFavorite);

export default router;