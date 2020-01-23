const express = require("express");
const Router = express.Router();

const uc = require("../controllers/userController");
const nodemailer = require("../controllers/emailController");
// GET ROUTES

Router.get("/", (req, res, next) => {
  console.log("Got the Get Response...");
  //   res.send("Welcome GET Users");
  let result = uc.getUsers();
  result.then(data => {
    console.log(data, "userroutes");
    res.status(201).json(data);
  });
});

// POST REQUESTS....

Router.post("/login", async (req, res, next) => {
  console.log("Got the Get Response...");
  let user = req.body;
  let result = uc.verifyUser(user);
  // console.log(result);
  result.then(data => {
    console.log(data, "checked user");
    res.status(201).json({
      message: data.msg,
      isAuthenticated: data.valid,
      token: data.token,
      userid: data.userid,
      permissions: data.permissions
    });
  });
  // res.send("Welcome GET LOGIN");
});

Router.post("/register", (req, res, next) => {
  console.log("Got the Get Response...");
  // console.log(req.body, "body");
  let userdata = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    roleid: req.body.role
  };
  // console.log(userdata, "tesing");
  let result = uc.createUser(userdata);
  console.log("RESULT=<?", result);
  result.then(data => {
    console.log(data);
    res.json(data);
  });
});

Router.post("/newpassword", (req, res, next) => {
  console.log("new password...Started...");
  let user = req.body;
  let result = uc.setNewPassword(user);
  console.log(result, "data ar route");
  result.then(data => {
    console.log(data, "result");
    res.json(data);
  });
});

Router.post("/otpverification", (req, res, next) => {
  console.log("otp verification stated..");

  let otp = req.body.otp;
  let result = nodemailer.verifyOTP(otp);
  console.log(result, "OTP");
  if (result) {
    res.json({ msg: "Otp Verified.", verifiedOTP: true });
  } else {
    res.json({ msg: "Otp verification Failed.", verifiedOTP: false });
  }
});

Router.post("/resetpassword", (req, res, next) => {
  console.log("reset password...Started...");
  let email = req.body.email;

  let result = uc.resetMailSender(email);
  if (result)
    result.then(resp => {
      console.log(resp);
      res.json(resp);
    });
});
Router.get("/delete/:userid", (req, res, next) => {
  console.log("Delete user route");
  let result = uc.deleteUser(parseInt(req.params.userid));
  result.then(data => {
    res.json(data);
  });
  // res.json({ data: req.params.userid });
});

Router.post("/changerole", (req, res, next) => {
  console.log("user updated...");
  let result = uc.changeRole(
    parseInt(req.body.userid),
    parseInt(req.body.roleid)
  );
  result.then(data => {
    res.json(data);
  });
  // res.json({ msg: "siva...changed role..", roleid: req.body.roleid });
});
module.exports = Router;
