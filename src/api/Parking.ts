import parkingController from '../controller/parkingController';
import { Router } from 'express';

const router = Router();

router.post('/', parkingController.register); // OK
router.delete('/:id', parkingController.cancel); // OK
router.get('/', parkingController.getall); // OK
router.put('/update/:id', parkingController.update); // OK
router.put('/updateAddress/:id', parkingController.updateAddress); // OK
router.get('/:id',parkingController.getOne); // OK

export default router;
