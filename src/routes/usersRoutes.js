import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser, loginUser } from '../controllers/usersControllers';
import { checkToken } from '../middlewares/auth';

const router = Router();

router.get('/', checkToken, getUsers);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/', deleteUser);
router.post('/login', loginUser);

export default router;