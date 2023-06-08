const express = require("express");
const env = require("dotenv")
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/database")
const userRouter = require("./routes/user")
const session = require("express-session")


const app = express()
const port = 3000;
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret:"08102961848",
    resave:false,
    saveUninitialized:false
}))
//app.use(express.json())
app.use(cors())
app.use(userRouter);

db.authenticate()
.then(()=>{
    console.log("Database connection successfully established");
    return db.sync()
}).then(()=>{
    console.log("Database sync with model")
    app.listen(port,()=>{
        console.log(`Server running on ${port}`)
    });
})
.catch((err)=>{
    console.log('Unable to connect to database: ',err);
})


