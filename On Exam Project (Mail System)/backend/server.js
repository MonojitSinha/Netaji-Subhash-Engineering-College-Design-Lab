const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require('nodemailer')
const usersModel = require("./models/users");

const app = express();

mongoose.connect("mongodb+srv://mono:Mono23!@cluster0.v4pca.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected")});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.post("/form",async (req, res) => {

  const name = req.body.name;

  const user = await usersModel.findOne({name:name});
  const email = user.email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "monojits.cse2017@nsec.ac.in",
      pass: "Welcome1234",
    },
  });
  
  const mailOptions = {
    from: "monojits.cse2017@nsec.ac.in",
    to: email,
    subject: "Sending Email using Node.js",
    text: "Hello World !",
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send(error)
    } else {
      console.log('WORKED',email);
      console.log("Email sent: " + info.response);
      res.json({email:email,msg:'Email sent ',name:user.name})
    }
  });





});

app.listen(5000, () => {
  console.log("Server listening on port 5000 . . .");
});
