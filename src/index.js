const express = require('express')
const bodyParser = require('body-parser')
const cors = require ('cors'); 
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
require('./controllers/usuario')(app)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));