// import { Router } from 'express';
// // import PetModel from '../models/PetModel';
// import { createPet, getPets } from '../controllers/petsControllers';

// const router = Router();

// router.get('/', getPets)

// router.post('/', createPet)

// export default router;

import { Router } from 'express';
import { createPet, getPets, updatePet, deletePet } from '../controllers/petsControllers';

const router = Router();

router.get('/', getPets);
router.post('/', createPet);
router.put('/:petId', updatePet);
router.delete('/:petId', deletePet); // Nueva ruta para eliminar mascotas

export default router;

