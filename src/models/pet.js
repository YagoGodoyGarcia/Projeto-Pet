const mongoose = require('mongoose')

//Criando Schema do Pet
const PetSchema = mongoose.model('Pet', new mongoose.Schema({
    nome:{
        type: String,
        require: true,
    },
    porte:{
        type: String,
        require: true,
    },
    raca:{
        type: String,
        require: true,
    },
    dono:{
        type: String,
        require: true,
    }
},{timestamps: true}));

module.exports = PetSchema

