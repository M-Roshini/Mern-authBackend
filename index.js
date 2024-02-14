var express = require("express")
const connectDb = require("./db")
var signinRouter = require("./routes/signin")
//
var LoginRouter = require("./routes/login")
var HomeRouter = require("./routes/home")



const cors=require("cors")

connectDb()
var app = express()
const port = 4000
app.use(express.json())
app.use(cors({origin:"*"}))

app.get("/", (req, res) => {
    res.send("hello world");
})

app.use("/signin", signinRouter)
app.use("/login", LoginRouter)
app.use("/home", HomeRouter)


app.listen(port, () => {
    console.log(` app listening to port ${port}`)
})