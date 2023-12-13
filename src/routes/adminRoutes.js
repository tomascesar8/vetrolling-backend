const { Router } = require('express');
const { getAdmins } = require('../controllers/adminControllers');

const router = Router();

router.get('/', getAdmins)

export default router;