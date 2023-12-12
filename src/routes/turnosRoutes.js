const { Router } = require('express');
const { getTurnos, createTurno, updateTurno, deleteTurno } = require('../controllers/turnosControllers');

const router = Router();

router.get('/', getTurnos);
router.post('/', createTurno);
router.put('/', updateTurno);
router.delete('/', deleteTurno);

module.exports = router