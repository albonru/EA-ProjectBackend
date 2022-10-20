import opinionController from '../controller/opinionController';
import { Router } from 'express';

const router = Router();

router.post('/opinion', opinionController.opinion);
router.get('/:id', opinionController.getallOpinionsPark);
router.get('/:id', opinionController.getallOpinionsUser);
router.get('/', opinionController.getall);
export default router;