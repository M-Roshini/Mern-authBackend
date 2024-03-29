const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
  auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.nodemailer_user,
        pass: process.env.nodemailer_ps,
    },
});
function sendMail(toEmail,subject,content){
    console.log("email")
    const mailOptions ={
        from:"roshinim03@gmail.com",
        to:toEmail,
        subject:subject,
        html:content,
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("error occurred",error);
        }
        else{
            console.log("Email sent: ",info.response);
        }
    })
}
module.exports={sendMail};