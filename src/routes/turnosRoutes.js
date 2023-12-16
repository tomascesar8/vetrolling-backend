const { Router } = require('express');
const { getTurnos, createTurno, updateTurno, deleteTurno } = require('../controllers/turnosControllers');
const { checkToken } = require('../middlewares/auth');

const router = Router();

router.get('/', checkToken, getTurnos);
router.post('/', createTurno);
router.put('/:id', updateTurno);
router.delete('/:id', deleteTurno);

module.exports = router;