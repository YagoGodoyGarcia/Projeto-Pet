const express = require('express')

const Pet = require('../models/pet')

const router = express.Router();
/**
 * @author Yago Garcia
 */

//Criando API de Registro de pet
router.post('/registrar', async (req, res) => {
    try {
        //Verificando se existe pet ja registrado com o mesmo nome e o mesmo dono
        let pet = await Pet.findOne({
            $and: [
                {
                    nome: req.body['nome'],
                    dono: req.body['dono']
                }
            ]
        })
        //Se não existir nem um pet com o mesmo nome e mesmo dono 
        //Cria e salva o novo pet
        if (!pet) {
            pet = await new Pet(req.body)
            pet.save()
        } else {
            //Retorna caso ja exista um pet com os dados passados 
            return res.status(403).send({ error: 'Pet ja está registrado' });
        }

        return res.status(201).send({ pet })
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha no registro' });
    }
})

//API de atualização de pet
router.put('/atualizar', async (req, res) => {
    try {
        //Buscando e atualizando pet
        let pet = await Pet.updateOne(
            { _id: req.body['id'] },
            { $set: {
                nome: req.body['nome'],
                porte: req.body['porte'],
                raca: req.body['raca'],
                dono: req.body['dono']
            } }
         )
        return res.status(204).send("Atualizado")
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha na atualização' });
    }
})

//API de remover pet
router.delete('/remover', async (req, res) => {
    try {
        //Buscando e removendo pet
        let pet = await Pet.remove({
            $and: [
                {
                    nome: req.body['nome'],
                    dono: req.body['dono']
                }
            ]
        })
        return res.status(204).send("Deletado")
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha na remoção' });
    }
})

//API de buscar pet
router.get('/pesquisar', async (req, res) => {
    try {
        //Buscando o pet
        let pet = await Pet.findOne({
            $and: [
                {
                    nome: req.body['nome'],
                    dono: req.body['dono']
                }
            ]
        })
        if(!pet){
            return res.status(400).send({ error: `Pet informado não existe ou inválido: - Dono: ${req.body['dono']}  - Pet: ${req.body['nome']}` });
        }
        return res.status(200).send({ pet })
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha na busca' });
    }
})

//API de listar todos os pet
router.get('/', async (req, res) => {
    try {
        //Buscando todos os pet
        let pet = await Pet.find()
        return res.status(200).send({ pet })
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha na busca' });
    }
})

module.exports = app => app.use('/pet', router)