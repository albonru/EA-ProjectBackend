import opinionController from '../controller/opinionController';
import { Router } from 'express';

const router = Router();

router.post('/', opinionController.opinion); // OK
// router.get('/:id', opinionController.getallOpinionsPark);
// router.get('/UserOpin/:id', opinionController.getallOpinionsUser);
router.delete('/:id', opinionController.cancel); // OK
router.get('/', opinionController.getall); // OK

export default router;