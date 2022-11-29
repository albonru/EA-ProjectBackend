import userController from '../controller/userController';
import { Router } from 'express';
import { verifyToken, isOwner, istheUser } from '../middlewares/authJWT'

const router = Router();

// FALTA VERIFY
router.post('/register', userController.register); // OK
router.get('/:id', userController.profile); // OK
router.get('/', userController.getall);  // OK
router.put('/forgotpass/', userController.changePass); // OK
router.put('/update/', [verifyToken, istheUser], userController.update); // OK
router.delete('/', [verifyToken, istheUser], userController.deleteUser); // OK

router.get('/myparkings/', [verifyToken], userController.getmyParkings);
router.get('/mybookings/', [verifyToken], userController.getmyBookings);
router.get('/myfavorites/', [verifyToken], userController.getmyFavorites);
router.get('/myopinions/', [verifyToken], userController.getmyOpinions);

router.put('/mybookings/', [verifyToken, istheUser], userController.updatemyBookings);
router.put('/myfavorites/', [verifyToken, istheUser], userController.updatemyFavorites);
router.put('/myopinions/', [verifyToken, istheUser], userController.updatemyOpinions);

export default router;