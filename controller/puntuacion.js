var Puntuacion = require('../models/puntuacion')


async function getAll(req,res){
    //Callbacks
   /* Puntuacion.find({}).exec( (err, puntuaciones)=>{
        if(err){
            res.status(500).send({accion:'get all', mensaje:'error al obtener la puntuacion'})
        }else{
            res.status(200).send({accion:'get all', datos: puntuaciones})
        }
    })*/
    // Promesas
    /*Puntuacion.find({}).exec()
        .then( puntuaciones => res.status(200).send({accion:'get all', datos: puntuaciones})   )
        .catch(  err =>  res.status(500).send({accion:'get all', mensaje:`error al obtener la puntuacion ${err}`})  )
    */

    // async / await
    try{
        let puntuaciones = await Puntuacion.find()
        res.status(200).send({accion:'get all', datos: puntuaciones})
    }catch(err){
        res.status(500).send({accion:'get all', mensaje:`error al obtener las puntuaciones ${err}`})
    }
}


async function getById(req,res){
    try{
        let puntuacionId = req.params.id;
        let puntuacion = await Puntuacion.findById(puntuacionId)
        res.status(200).send({accion:'get one', datos: puntuacion})
    }catch(err){
        res.status(500).send({accion:'get one', mensaje:`error al obtener la puntuacion ${err}`})
    }
}


async function insert(req, res){
    const puntuacion = new Puntuacion(req.body)
    puntuacion._id = undefined;
    console.log(req.body)
    try{
        let puntuacionGuardada = await puntuacion.save()
        res.status(200).send({accion:'save', datos: puntuacionGuardada})
    }catch(err){
        res.status(500).send({accion:'save', mensaje:`error al guardar la puntuacion ${err}`})
    }
}


async function remove(req,res) {
    try{
        let puntuacionId = req.params.id;
        let puntuacionBorrada = await Puntuacion.findByIdAndRemove(puntuacionId)
        if(!puntuacionBorrada ) {
           return res.status(404).send({accion:'remove', mensaje:`error no existe el id a borrar. ${err}`})
        }
        
        res.status(200).send({accion:'remove', datos: puntuacionBorrada})
        
    }catch(err){
        res.status(500).send({accion:'remove', mensaje:`error al borrar la puntuacion. ${err}`})
    }
}

async function update(req,res){
    try{
        var datos = req.body;
        let puntuacionId = req.params.id;
        let puntuacionActualizada = await Puntuacion.findByIdAndUpdate(puntuacionId, datos)
        if(!puntuacionActualizada ) {
            return res.status(404).send({accion:'update', mensaje:`error no existe el id a actualizar. ${err}`})
        }
        
        res.status(200).send({accion:'update', datos: puntuacionActualizada})
        
    }catch(err){
        res.status(500).send({accion:'update', mensaje:`error al acttualizar la puntuacion ${err}`})
    }
}

module.exports = {getAll, getById, insert, remove, update}


