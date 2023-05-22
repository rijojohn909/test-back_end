//  import express
const express = require('express')

// import cors
const cors = require('cors')

// import data service
const dataService = require('./services/dataService')

// import jsonwebtoken
const jwt = require('jsonwebtoken')

// create server app using express
const server = express()

// use cors
server.use(cors({
    origin: 'http://localhost:4200'
}))

// to parse json
server.use(express.json())

// Set up port number for server application
server.listen(3000, () => {
    console.log('server started at 3000');
})




// application specific middleware
const appMiddleware = (req,res,next)=>{
    console.log('Inside application specific middleware');
    next()
 }
server.use(appMiddleware)


// token verify middleware
const jwtMiddleware = (req,res,next)=>{
    console.log('Inside router specific middleware');
    // get token from request headers
    const token = req.headers['access-token']
    try{
        // verify the token
    const data = jwt.verify(token,'supersecretkey123')
    console.log('data');
    req.fromPhno = data.currentPhno
    console.log('valid Token');
    next()
    }
    catch{
        console.log('invalid token');
        res.status(401).json({
            message:'please login!'
        })
    }
}

// register api call
server.post('/register', (req, res) => {
    console.log('Inside register function');
    console.log(req.body);
    // asynchronous
    dataService.register(req.body.uname, req.body.phno, req.body.pswd, req.body.ename, req.body.email)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})

// login
server.post('/login', (req, res) => {
    console.log('Inside login function');
    console.log(req.body);
    // asynchronous
    dataService.login(req.body.phno, req.body.pswd)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})

// getdetails
server.get('/getDetails/:phno',jwtMiddleware, (req, res) => {
    console.log('Inside get Balance api');
    console.log(req.params.phno);
    // asynchronous
    dataService.getDetails(req.params.phno)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})

// register api call
server.post('/editDetails', (req, res) => {
    console.log('Inside register function');
    console.log(req.body);
    // asynchronous
    dataService.editDetails(req.body.uname, req.body.phno, req.body.ename, req.body.email)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})


// delete account
server.delete('/delete-account/:phno',jwtMiddleware, (req, res) => {
    console.log('Inside delete account api');
    console.log(req.params.phno);
    // asynchronous
    dataService.deleteMyAccount(req.params.phno)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})

