import userController from '../controller/userController';
import { Router } from 'express';

const router = Router();

// FALTA VERIFY
router.post('/', userController.register); // OK
router.get('/:id', userController.profile); // OK
router.get('/', userController.getall);  // OK
router.put('/forgotpass/:id', userController.changePass); // OK
router.put('/update/:id', userController.update); // OK
router.delete('/:id', userController.deleteUser); // OK

router.get('/myparkings/:id', userController.getmyParkings);
router.get('/mybookings/:id', userController.getmyBookings);
router.get('/myfavorites/:id', userController.getmyFavorites);
router.get('/myopinions/:id', userController.getmyOpinions);

router.put('/mybookings/:id', userController.updatemyBookings);
router.put('/myfavorites/:id', userController.updatemyFavorites);
router.put('/myopinions/:id', userController.updatemyOpinions);

export default router;