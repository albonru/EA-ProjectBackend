import userController from '../controller/userController';
import { Router } from 'express';

const router = Router();

// ALL OK NO VERIFY
router.post('/register', userController.register); // Irene
router.post('/login', userController.login); // Ferran
router.get('/profile/:id', userController.profile); // Alvaro
router.get('/', userController.getall); // Alvaro
router.put('/forgotpass/:id', userController.changePass); // NO
router.put('/update/:id', userController.update); // Alba
router.delete('/delete/:id', userController.deleteUser); // Aida

// router.put('/addParking', userController.addParking);
// router.put('/addBooking', userController.addBooking);
// router.put('/addOpinion', userController.addOpinion);
// router.put('/addFavorite', userController.addFavorite);

export default router;