import opinionController from '../controller/opinionController';
import { Router } from 'express';

const router = Router();

router.post('/opinion', opinionController.opinion);
router.get('/:id', opinionController.getallOpinionsPark);
router.get('/UserOpin/:id', opinionController.getallOpinionsUser);
router.delete('/DelOpinUser/:id',opinionController.cancel);
router.get('/', opinionController.getall);
export default router;