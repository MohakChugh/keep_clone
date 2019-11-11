const jwt = require('jsonwebtoken')
const validator = require('validator')

const query = require('../database/query')
const encryptPassword = require('../encryption/encrytion')

const secretkey = 'VerySecretKey'

// Checks if the email is valid or not & Encrypts the password
const signup = async (email, password) => {

    console.log('inside signup function of authentication')

    let checkIfEmail = validator.isEmail(email)
    if (checkIfEmail) {
        try {
            // Encrypt password
            let hashedPassword = await encryptPassword.encryptPassword(password)
            console.log(`Hashed password ${hashedPassword}`)
            return hashedPassword
        } catch (err) {
            console.log(err)
            return err
        }
            
    } else {
        isEmail = false
        console.log(isEmail)
        return isEmail
    }
}

const login = async (password, hashedPassword) => {
    try {
        let isAuthenticated = await encryptPassword.comparePassword(password, hashedPassword)
        console.log(isAuthenticated)
        return isAuthenticated
    } catch (err) {
        console.log(err)
    }
}

const generateJWT = async (username) => {
    try {
        let token = await jwt.sign(username, secretkey)
        return token
    } catch (err) {
        console.log(err)
        return err
    }
}

const validateToken = async (token) => {
    try {
        // Decode Jwt which contains encrypted password
        var decode = jwt.verify(token, secretkey)
        console.log(decode)
        let userid = await query.CheckUserFromDatabase(decode)
        console.log(userid)
        // Existance of user is checked by checking the id of user in the databse by providing the hashed password
        // Return true on Existance, False Otherwise
        if (userid.user[0].id > 0) {
            console.log('id > 0')
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
    }
}

exports.signup = signup
exports.login = login
exports.generateJWT = generateJWT
exports.validateToken = validateToken