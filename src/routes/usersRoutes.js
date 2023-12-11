import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/usersControllers';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/', deleteUser);


// router.post('/', (req, res) => {
//   console.log('POST por console');
//   const home = {
//     message: 'POST con express',
//     paper: 'ok'
//   }
//   res.status(201).json(home);
// })

// router.put('/', (req, res) => {
//   console.log('PUT por console');
//   const home = {
//     message: 'PUT con express',
//     paper: 'ok'
//   }
//   res.status(200).json(home);
// })

// router.delete('/', (req, res) => {
//   console.log('DELETE por console');
//   const home = {
//     message: 'DELETE con express',
//     paper: 'ok'
//   }
//   res.status(200).json(home);
// })

export default router;