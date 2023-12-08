import { Router } from 'express';
import { getUsers } from '../controllers/usersControllers';
import { createUser } from '../controllers/usersControllers';
import { getUsersByTomsom } from '../controllers/usersControllers';

const router = Router();

router.get('/', getUsers);
router.get('/tomson', getUsersByTomsom);
router.post('/', createUser);


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