const express = require('express');
const validator = require('validator')
const router = express.Router();

const authentication = require('../authentication/auth')
const insert = require('../database/insert')
const query = require('../database/query')

router.get('/test', (req, res) => {
    res.send('router working');
});

router.post('/signup', async (req, res) => {

    console.log('Inside Signup Route')

    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let encryptedPassword = await authentication.signup(email, password)
    console.log(encryptedPassword)
    let insertuser = await insert.addUser(email, encryptedPassword, username)
    if (insertuser.isEmail ===  false) {
        res.json({
            userAdded: false,
            data : { 'EmailNotValid' : true }
        });
    } else {
        res.json({
            userAdded: true,
            data: insertuser
        });
    }
})

router.post('/login', async (req, res) => {
    //Check if the user sent username or email
    let password = req.body.password
    let resultFromDatabase
    let EncryptedPassword
    let userID
    if(validator.isEmail(req.body.username)) {
        let email = req.body.username
        resultFromDatabase = await query.loginwithemail(email)
        EncryptedPassword = await resultFromDatabase.user[0].password
        userID = await resultFromDatabase.user[0].id
        if(!EncryptedPassword) {
            res.send('No user Exists');
        }
        else {
            let isAuthenticated = await authentication.login(password, EncryptedPassword)
            console.log(isAuthenticated)
            if(isAuthenticated) {
                let token = await authentication.generateJWT(userID)
                let Data = {
                    token: token
                }
                res.send(Data);
            }
        }
        console.log(resultFromDatabase)
    } else {
        let username = req.body.username
        resultFromDatabase = await query.loginwithusername(username)
        console.log(resultFromDatabase)
        EncryptedPassword = await resultFromDatabase.user[0].password
        console.log(EncryptedPassword)
        userID = await resultFromDatabase.user[0].id
        if(!EncryptedPassword) {
            res.send('No user Exists');
        } else {
            let isAuthenticated = await authentication.login(password, EncryptedPassword)
            console.log(isAuthenticated)
            if(isAuthenticated) {
                let token = await authentication.generateJWT(userID)
                let Data = {
                    token: token
                }
                res.send(Data);
            }
        }
    }
});

router.post('/addnote', async (req, res) => {
    let headers = req.headers.authentication
    console.log(headers)
    headers = headers.split(" ")
    let token = headers[1]
    console.log(token);
    let validated = await authentication.validateToken(token)
    console.log(validated)
    if (validated === true) {
        // Let users add note
        let userid = req.body.userid
        let note = req.body.note
        let result = await insert.addUserNotes(userid, note)
        res.send(result)
    }
});

router.post('/addshoppinglist', async (req, res) => {
    let headers = req.headers.authentication
    console.log(headers)
    headers = headers.split(" ")
    let token = headers[1]
    console.log(token);
    let validated = await authentication.validateToken(token)
    console.log(validated)
    if (validated === true) {
        // Let users add note
        let userid = req.body.userid
        let list = req.body.list
        let result = await insert.addUserShoppingList(userid, list)
        res.send(result)
    }
});

router.post('/addtasks', async (req, res) => {
    let headers = req.headers.authentication
    console.log(headers)
    headers = headers.split(" ")
    let token = headers[1]
    console.log(token);
    let validated = await authentication.validateToken(token)
    console.log(validated)
    if (validated === true) {
        // Let users add note
        let userid = req.body.userid
        let task = req.body.tasks
        let result = await insert.addUserTasks(userid, task)
        res.send(result)
    }
});

router.post('/deletenote', async (req, res) => {
    let headers = req.headers.authentication
    console.log(headers)
    headers = headers.split(" ")
    let token = headers[1]
    console.log(token);
    let validated = await authentication.validateToken(token)
    console.log(validated)
    if (validated === true) {
        // Let users add note
        let userid = req.body.userid
        let note = req.body.note
        let result = await insert.deleteUserNotes(userid, note)
        res.send(result)
    }
});

module.exports = router