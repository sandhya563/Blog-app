const knex = require('knex')({
    client: "mysql",
    connection:{
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Sandhya@563',
        database: 'BlogApp'
    }
});
knex.schema.hasTable("users").then(function(exits){
    if(!exits){
        console.log("users table has created successfully");
        return knex.schema.createTable("users",function(table){
            table.increments("id").primary();
            table.string("username");
            table.string("email");
            table.string("password");
        })
    }
})
knex.schema.hasTable("createpost").then(function(exits){
    if(!exits){
        console.log("createpost table has created successfully");
        return knex.schema.createTable("createpost",function(table){
            table.increments("id").primary();
            table.integer("user_id");
            table.string("title");
            table.string("description");
            
        })
    }
})

module.exports = knex;
