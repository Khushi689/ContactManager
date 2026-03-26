const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors");
const path = require('path')
const dotenv = require('dotenv')


// if you have clone this project then you first need to create .env file in this same directory and place MURI:____ and PORT:8080 .

const authroute= require('./routes/auth')
const contactroute= require('./routes/contact')

dotenv.config()
// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());



// const mongoUri = ''
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(process.env.MURI,connectionParams)
.then( () => {
    console.log('Successfuly Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})


app.use('/api/auth',authroute)
app.use('/api/contact',contactroute)

// if(process.env.NODE_ENV == "production"){
// app.use(express.static(path.join(__dirname, "frontend", "build")))

// ...
// Right before your app.listen(), add this:
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });
// }

            
            
app.listen(process.env.PORT || 8080,()=>{
    console.log(`app is running on port ${process.env.PORT}`)
})
