const express = require('express')
const router = express.Router();
const { dados, sites, users, suite } = require('../dados/dados');
/**
 * @author Yago Garcia
 */

router.get('/sites', async (req, res) => {
    try {
        let info = dados()
        info.then(function (u) {
            let web = sites(u)
            return res.status(200).send({ web })
        })
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha na busca' });
    }
})

router.get('/', async (req, res) => {
    try {
        let info = dados()
        info.then(function (u) {
            let usersOrder = users(u)
            return res.status(200).send({ usersOrder })
        })
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha na busca' });
    }
})


router.get('/suite', async (req, res) => {
    try {
        let info = dados()
        info.then(function (u) {
            let users = suite(u)
            return res.status(200).send({ users })
        })
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha na busca' });
    }
})



module.exports = app => app.use('/user', router)