const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser, loginUser, getAuthUser } = require('../controllers/usersControllers');
const { checkToken } = require('../middlewares/auth');

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', checkToken, updateUser);
router.delete('/:id', checkToken, deleteUser);
router.post('/login', loginUser);
router.get('/auth', checkToken, getAuthUser);

export default router;
