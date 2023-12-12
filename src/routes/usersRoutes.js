import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser, loginUser } from '../controllers/usersControllers';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/', deleteUser);
router.post('/login', loginUser);

export default router;