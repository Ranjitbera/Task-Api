const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./router/router.js');

const dbUrl = "mongodb+srv://ranjitbera34567:ranjit@cluster0.eqew2sz.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery' ,false);
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to database successfully")
});

app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/',router);

app.listen(8080,()=>{
    console.log('app is running on port 8080')
});