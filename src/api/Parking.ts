import parkingController from '../controller/parkingController';
import { Router } from 'express';

const router = Router();

router.post('/register', parkingController.register); // Aida
router.delete('/cancel/:parkingId', parkingController.cancel); // Alba
router.get('/', parkingController.getall); // Ferran
router.put('/update/:parkingId', parkingController.update); // Alvaro
router.put('/updateAddress/:parkingId', parkingController.updateAddress); // NO
router.get('/:parkingId',parkingController.getOne); // Irene

export default router;
