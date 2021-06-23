const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { genenarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res= response)=>{

    const {email, password} = req.body;

    try { 

        let usuario = await Usuario.findOne({ email });

        if(usuario) {
            return res.status(400).json({ 
                ok: false,
                msg: 'Un Usuario Existe con ese correo'
            });
        }

        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
        await usuario.save();

        //Generar JWT
        const token = await genenarJWT(usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = async (req, res = response)=>{ 

  const {email, password} = req.body;

  try {

    const usuario = await Usuario.findOne({ email });

    if(!usuario) {
        return res.status(400).json({ 
            ok: false,
            msg: 'El usuario no existe con ese email'
        });
    }
    //confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if( !validPassword ) {
        return res.status(400).json({
            ok: false,
            msg: 'Contraseña incorrecta'
        });
    }
    //Generar JWT
    const token = await genenarJWT(usuario.id, usuario.name );

    res.json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
    })

  } catch (error) {
    
    res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
    });     
  }
}

const revalidarToken = async(req, res = response)=>{

    const {uid, name} = req;
    //generar un nuevo JWT y retornarlo en esta peticiòn
    const token = await genenarJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}