import { Router } from 'express';
import { getServices } from '../controllers/servicesControllers';

const router = Router();

router.get('/', getServices)

export default router;