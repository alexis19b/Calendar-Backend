/* Rutas de Eventos /events
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jsonwebtoken');

const router= Router();




// Todas tienen  que pasar por la validacion del JWT
router.use( validarJWT );

// Obtener Eventos
router.get('/', getEventos);

//Crear un nuevo Evento
router.post(
    '/',
    [
        check('title','El titulo es obligatioria').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha final es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
    );

//Actualizar Evento
router.put(
    '/:id',
    [
        check('title','El titulo es obligatioria').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha final es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento);

//Borrar Evento
router.delete('/:id', eliminarEvento);

module.exports = router;

