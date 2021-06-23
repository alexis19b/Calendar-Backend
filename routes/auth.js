/* Rutas de usuarios /auth 
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jsonwebtoken');

const router = Router();
    
router.post(
    '/register',
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatiorio').isEmail(),
        check('password', 'La contraseña debe tener 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
     crearUsuario);

router.post(
    '/', 
    [ //middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener 6 caracteres').isLength({min: 6}),
        validarCampos
    ], 
    loginUsuario);

    //si es un solo middelwere coloco el validarJWT de esa manera si son mas de uno como un arreglo
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;