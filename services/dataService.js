// import db.js
const db = require('./db')

// import jsonwebtoken
const jwt = require('jsonwebtoken')

// register
const register = (uname, phno, pswd, ename, email) => {
    // check phno is in mongodb - db.users.findOne()
    return db.User.findOne({
        phno
    }).then((result) => {
        console.log(result);
        if (result) {
            // if phno exists
            return {
                statusCode: 401,
                message: 'User already exist'
            }
        }
        else {
            // to add new user
            const newUser = new db.User({
                username: uname,
                phno: phno,
                password: pswd,
                name: ename,
                email: email
            })
            newUser.save()
            return {
                statusCode: 200,
                message: 'Registration successful'
            }
        }
    })
}
// login
const login = (phno,pswd) => {
    console.log('inside login function');
    // check phno ,pswd is in mongodb - db.users.findOne()
    return db.User.findOne({
        phno,
        password: pswd
    }).then((result) => {
        if (result) {

            // generate token
            const token = jwt.sign({
                currentPhno:phno
            },'supersecretkey123')
            return {
                statusCode: 200,
                message: 'login successful',
                username: result.username,
                currentPhno: phno,
                token
            }
        }
        else {
            return {
                statusCode: 404,
                message: 'Invalid phno'
            }
        }
    })

}

// editDetails
const editDetails = (uname, phno, ename, email) => {
    // check phno is in mongodb - db.users.findOne()
    return db.User.findOne({
        phno
    }).then((result) => {
        console.log(result);
        if (result) {
            
            // to add new user
            const newUser = new db.User({
                username: uname,
                phno: phno,
                name: ename,
                email: email
            })
            newUser.save()
            return {
                statusCode: 200,
                message: 'Updation successful'
            }
        }
    })
}

// getdata
const getDetails = (phno) => {
    return db.User.findOne({
        phno
    }).then((result) => {
        if (result) {
            return {
                statusCode: 200,
                users: result
            }
        }
        else{
            return{
                statusCode: 404,
                message: 'Invalid Account'
            }
        }
    }
    )
}






// delete account
const deleteMyAccount = (phno)=>{
return db.User.deleteOne({
    phno
}).then((result)=>{
    if(result){
        return{
            statusCode: 200,
            message: "Account Deleted Successfully"
        }
    }
    else{
        return{
            statusCode: 401,
            message: "Invalid Phone Number"
        }
    }
})
}

// export
module.exports = {
    register,
    login,
    getDetails,
    editDetails,
    deleteMyAccount  
}