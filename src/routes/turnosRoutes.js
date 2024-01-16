const { Router } = require('express');
const { getTurnos, getTurno, createTurno, updateTurno, deleteTurno } = require('../controllers/turnosControllers');
const { checkToken } = require('../middlewares/auth');

const router = Router();

router.get('/', getTurnos);
router.get('/:id', getTurno);
router.post('/', createTurno);
router.put('/:id', updateTurno);
router.delete('/:id', deleteTurno);

module.exports = router;