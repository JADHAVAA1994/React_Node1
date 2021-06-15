const bodyParser = require('body-parser')
const express = require('express')
const nodemailer = require('nodemailer');
const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/',(req,res) => {
    res.send('<h1> Welcome to My Home Page </h1>')
})

app.post('/api/sendEmail',(req,res) => {
    res.send("Yes i got")
    let data = req.body
    console.log(data);
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
    

        auth: {
            user: '',   //Enter User ID
            pass: ''  //Password
            
        }
    })

    const mailOptions = {
        from: '',
        to: '',
        subject: 'Message from Client',
        html:`
        <ul>
            <li>
                <h1> Name: ${data.name} </h1>
            </li>
            
            <li>
                <h1> Phone_Number: ${data.phonenumber} </h1>
            </li>
            
            <li>
                <h1> Email: ${data.email} </h1>
            </li>
            
            <li>
                <h1> Message: ${data.message} </h1>
            </li>
        </ul>
        `
    }

    transporter.sendMail(mailOptions, (error,info) => {
        if (error) {
            console.log(error);
        }else{
            console.log('Email Sent : ${info.response}');
        }
        transporter.close()

    })
})


app.listen(8000, () => {
    console.log('server starting up port 8000!');
})

