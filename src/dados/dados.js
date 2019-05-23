/*Função responsavel pela chamada dos dados e retorno do mesmo*/
async function dados() {
    const fetch = require("node-fetch");
    const response = await fetch('https://jsonplaceholder.typicode.com/users').then(function (data) {
        return data.json();
    })
    return response
}

// retnorna todos os sites de usuarios 
function sites(u) {
    let utl = []
    u.forEach(function (element) {
        utl = [...utl, element.website]
    });
    return utl
}
// Retorna todos os dados nome, email e empresa de tosos os usuarios 
function users(u) {
    let usersArray = []
    u.forEach(function (element) {
        usersArray = [...usersArray, new Object({
            name: element.name,
            email: element.email,
            company: element.company.name
        })]
    });

    order(usersArray)

    return usersArray
}
// ordena os dados em ordem alfabetica de acordo com o nome do usuario
function order(u) {
    u.sort(function(a,b){
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0 
    })
    return u
}

// fução responsavel por separar e retornar todos os usuarios com a palavra Suite no endereço
function suite(u) {
    let usersArray = []
    u.forEach(function (element) {
        // verificando se apalavra 
        if (!element.address.suite.indexOf('Suite'))
        usersArray = [...usersArray, element]
    })
    order(usersArray)
    return usersArray
}

exports.suite = suite;
exports.users = users;
exports.sites = sites;
exports.dados = dados;
