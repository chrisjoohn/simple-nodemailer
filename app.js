
const express = require('express');
const nodemailer = require('nodemailer')
const path = require('path')

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user: "chrisjohnmulingbayan@gmail.com",
        pass: "passwordkoto"
    }
})

const app = express()

app.use(express.urlencoded()) //Get data from the form
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req,res) => {
    res.sendFile('index.html');
});

app.post('/', async(req, res) => {
    const body = req.body
    const email = body.email
    const subject = body.subject 
    const message = body.message

    console.log('sending message...');
    try{
        await transporter.sendMail({
            from: 'No Reply <chrisjohnmulingbayan@gmail.com>',
            to: email,
            subject: subject,
            text: message
        }, () => {
            res.redirect("/?success");
            console.log('message sent!');
        });
    }catch(error){
        console.log(error.message);
        res.redirect('/?error');
    }
});


app.listen(3000, () => {
    console.log("Listening to port: 3000...");
});