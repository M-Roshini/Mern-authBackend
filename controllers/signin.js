const User=require("../models/User")
//const {sendMail}=require("./SendMail")
const{sendMail}=require("../controllers/SendMail")
const bcrypt =require("bcrypt")
const mongoose=require("mongoose")
var jwt= require('jsonwebtoken')
const verifyUser=require("../models/verifyUser");
const dotenv=require("dotenv")
dotenv.config();


async function InsertVerifyUser(name,email,password){
    try{
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const token =  generateToken(email)

        const newUser=new verifyUser({
            name:name,
            email:email,
            password: hashedPassword,
            token:token,
        })
        const activationLink =`https://mern-authbe.onrender.com/signin/${token}`

        const content=`<h4> hi, there</h4>
        <h5>Welcome to the app</h5>
        <p> Thank you for signing,click on the below link to get activate</p>
        <a href="${activationLink}">click here</a>
        <p>Regards </p>
        <p>Team</p>`
        console.log(newUser)
        

        await newUser.save()
        sendMail(email,"verifyUser",content)
    }catch(e){
        console.log(e)

    }
}

function generateToken(email){
    const token=jwt.sign(email,process.env.signup_Secret_Token)
    return token
}

async function InsertSignUpUser(token){
    try{
        const userVerify= await verifyUser.findOne({token:token})
    if (userVerify){
        const newUser= new User({
            name:userVerify.name,
            email: userVerify.email,
            password: userVerify.password,
            forgetPassword:{}
        })
        await newUser.save()
        await userVerify.deleteOne({token:token})
        const content=`<h4> Registration Successfull</h4>
        <h5>Welcome to the app</h5>
        <p> You are successfully Registered </p>
        <p>Regards </p>
        <p>Team</p>`
        sendMail(newUser.email,"Registration Successfull",content)
        return `<h4> hi, there</h4>
        <h5>Welcome to the app</h5>
        <p> You are successfully Registered </p>
        <p>Regards </p>
        <p>Team</p>`
    }
    return `<h4> Registration Failed </h4>
    <p> Link expired....... </p>
    <p>Regards </p>
    <p>Team</p>`

    }catch(error){
        console.log(error)
        return `<html>
        <body>
        <h4> Registration Failed </h4>
        <p> Unexpected Error Happened....... </p>
        <p>Regards </p>
        <p>Team</p>
        </body>
        </html>`

    }
}

module.exports={InsertVerifyUser,InsertSignUpUser}