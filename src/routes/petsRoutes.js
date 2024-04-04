import { Router } from 'express';
import { createPet, getPets, updatePet, deletePet } from '../controllers/petsControllers';

const router = Router();

router.get('/', getPets);
router.post('/', createPet);
router.put('/:petId', updatePet);
router.delete('/:petId', deletePet);

export default router;