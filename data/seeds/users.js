const bcrypt = require('bcryptjs');
exports.seed=function(knex){
    //Delete existing entries
    return knex('users')
    .del()
    .then(function() {
        // insert entries
        return knex('users').insert([
        {
            "id": 1,
            "username": 'Tannia',
            "password": bcrypt.hashSync('1234', 10),
            "email" : 'tania@gmail.com',
        },
           
        ])
    }) 
}
