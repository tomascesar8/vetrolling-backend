import { Router } from 'express';
// import PetModel from '../models/PetModel';
import { createPet, getPets } from '../controllers/petsControllers';

const router = Router();

router.get('/', getPets)

router.post('/', createPet)

export default router;