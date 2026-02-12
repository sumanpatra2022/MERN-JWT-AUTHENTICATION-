const express = require("express");
const bodyParser=require('body-parser');
const cors=require('cors');
const AuthRoute=require("./Routes/AuthRoute");
const Product=require("./Routes/ProductRoutes");


const app=express();
require('dotenv').config();
require('./Models/db');

const PORT=process.env.PORT ||8080;



app.get("/ping",(req,res)=>{
    res.send("hello suman");
});

app.use(bodyParser.json());
app.use(cors());//cors is use for to connect port of server and client whcih com from react
app.use('/auth',AuthRoute);
app.use('/products',Product);

app.listen(PORT,()=>{
    console.log(`App listening on ${PORT} `);
});

