var nodemailer = require("nodemailer");

var otpGenerator = require("otp-generator");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fridayaiofskr@gmail.com",
    pass: "friday@123"
  }
});
var OTP = null;

const resetMail = email => {
  OTP = otpGenerator.generate(6, { upperCase: false, specialChars: false });
  setTimeout(() => {
    OTP = null;
  }, 300000);

  let msg = `<div ><p>Here is your Otp to reset password</p><br/><h2 style='border:1px solid black; border-radius:5px; width:100px;padding:10px;margin:5px'>${OTP}</h2></div>`;
  var mailOptions = {
    from: "siva.krishna@gmail.com",
    to: email,
    subject: "PassWord Reset",
    html: msg
  };
  let data = transporter.sendMail(mailOptions);
  console.log(data, " at mailer...");
  return data;
};
const verifyOTP = otp => {
  if (otp === OTP) {
    OTP = null;

    return true;
  } else {
    OTP = null;

    return false;
  }
};
module.exports = {
  resetMail,
  verifyOTP,
  OTP
};
