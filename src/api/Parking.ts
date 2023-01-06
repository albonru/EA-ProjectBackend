import parkingController from '../controller/parkingController';
import { Router } from 'express';
import { verifyToken, isOwner } from '../middlewares/authJWT'

const router = Router();

router.post('/', [verifyToken], parkingController.register); // OK
router.delete('/', [verifyToken, isOwner], parkingController.cancel); // OK
router.get('/', parkingController.getall); // OK
router.post('/filter', parkingController.filter); // OK
router.put('/update/', [verifyToken, isOwner], parkingController.update); // OK
router.put('/updateAddress/', [verifyToken, isOwner], parkingController.updateAddress); // OK
router.get('/:id', parkingController.getOne); // OK
router.get('byStreet/:street', parkingController.getByStreet);
router.get('location/:id', parkingController.getLocation);

export default router;
