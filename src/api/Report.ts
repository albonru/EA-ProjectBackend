import reportController from '../controller/reportController';
import { Router } from 'express';
import { verifyToken } from '../middlewares/authJWT';

const router = Router();

router.post('/:id',[verifyToken], reportController.newReport); // OK
router.delete('/:id', reportController.deleteReport); // OK
router.get('/', reportController.getall); // OK
router.get('/:id', reportController.getOne); // OK


export default router;

// newReport,
// deleteReport,
// getall,
// getOne