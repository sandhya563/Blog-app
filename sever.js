const express = require("express");
const app = express();
const port = 3000;
const user = require("./router")
const db= require("./dbconnection")

app.use(express.json());
app.use(user);
app.use(db);

app.listen(port,()=>{
    console.log(`sever is runing on port ${port}`)
})