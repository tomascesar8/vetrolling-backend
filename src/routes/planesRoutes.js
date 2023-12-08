import { Router } from 'express';
import { getPlanes } from '../controllers/planesControllers';

const router = Router();

router.get('/', getPlanes)

export default router;