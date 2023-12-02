import { Router } from 'express';
// import PetModel from '../models/PetModel';
import { createPet, getPet } from '../controllers/petsControllers';

const router = Router();

router.get('/', getPet)

router.post('/', createPet)

export default router;