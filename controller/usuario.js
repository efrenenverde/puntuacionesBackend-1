var Usuario = require('../models/usuario')

async function getAll(req,res){
    try{
        let usuarios = await Usuario.find()
        res.status(200).send({accion:'get all', datos: usuarios})
    }catch(err){
        res.status(500).send({accion:'get all', mensaje:`error al obtener los usuarios ${err}`})
    }
}

async function getById(req,res){
    try{
        let UserId = req.params.id;
        let usuario = await Usuario.findById(UserId)
        res.status(200).send({accion:'get one', datos: usuario})
    }catch(err){
        res.status(500).send({accion:'get one', mensaje:`error al obtener el usuario ${err}`})
    }
}

async function insert(req, res){
    const usuario = new Usuario(req.body)
    usuario.id = undefined;
    console.log(req.body)
    try{
        let usuarioGuardado = await usuario.save()
        res.status(200).send({accion:'save', datos: usuarioGuardado})
    }catch(err){
        res.status(500).send({accion:'save', mensaje:`error al guardar el usuario ${err}`})
    }
}

async function remove(req,res) {
    try{
        let userId = req.params.id;
        let usuarioBorrado = await Usuario.findByIdAndRemove(userId)
        if(!usuarioBorrado) {
           return res.status(404).send({accion:'remove', mensaje:`error no existe el id a borrar. ${err}`})
        }
        
        res.status(200).send({accion:'remove', datos: usuarioBorrado})
        
    }catch(err){
        res.status(500).send({accion:'remove', mensaje:`error al borrar el usuario. ${err}`})
    }
}

async function update(req,res){
    try{
        var datos = req.body;
        let usuarioId = req.params.id;
        let usuarioActualizada = await usuario.findByIdAndUpdate(usuarioId, datos)
        if(!usuarioActualizada ) {
            return res.status(404).send({accion:'update', mensaje:`error no existe el id a actualizar. ${err}`})
        }
        
        res.status(200).send({accion:'update', datos: usuarioActualizada})
        
    }catch(err){
        res.status(500).send({accion:'update', mensaje:`error al actualizar la usuario ${err}`})
    }
}

async function login(req,res){}

async function logout(req,res){}

module.exports = {getAll, getById, insert, remove, update, login, logout}