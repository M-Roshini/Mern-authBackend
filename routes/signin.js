const express = require("express")
const { CheckUser } = require("../controllers/Login")
const { InsertVerifyUser, InsertSignUpUser } = require("../controllers/signin")
var router = express.Router() //post request


router.get("/:token", async (req, res) => {  //:token is params
    try{
        const response = await InsertSignUpUser(req.params.token)
        res.status(200).send(response)
    }catch(e){
        console.log(e)
        res.status(500).send(
            `<html>
        <body>
        <h4> Registration Failed </h4>
        <p> Link Expired.... </p>
        <p>Regards </p>
        <p>Team</p>
        </body>
        </html>`
        )
    }
}
)
router.post("/verify", async (req, res) => {
    try {
        const { name, email, password } = await req.body;
        console.log(name, password, email);
        const registerCredentials = await CheckUser(email);
        if (registerCredentials === false) {
            await InsertVerifyUser(name, email, password)
            res.status(200).send(true)

        } else if (registerCredentials === true) {
            res.status(200).send(false)
        } else if (registerCredentials === "Server Busy") {
            res.status(500).send("Server Busy")

        }
    } catch (e) {
        console.log(e)
    }
})




module.exports = router;