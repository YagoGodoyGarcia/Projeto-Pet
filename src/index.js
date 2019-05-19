const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
require("./database/index")();
require('./controllers/authPet')(app)

app.listen(3000)