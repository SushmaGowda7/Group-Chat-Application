const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res, next) => {
    fs.readFile('chat.txt', (err, data) => {
        if(err){
            data = 'No chat exists'
            console.log(err);
        }
        res.send(`${data}
        <form action="/" onSubmit="document.getElementById('username').value=localStorage.getItem('username')" 
        method="POST">
        <input type="text" name="message" id="message" placeHolder="Enter message">
        <input type="hidden" name="username" id="username">
        <button type="submit">Send</button></form>`
        )
    })
})

router.post('/', (req, res, next) => {
    fs.writeFile('chat.txt', `${req.body.username}: ${req.body.message}`, {flag: 'a'}, (err) => {
        err ? console.log(err) : res.redirect('/');
    });
})

module.exports = router;
