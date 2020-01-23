const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("../controllers/emailController");
const getUsers = () => {
  let data;

  console.log("show users...");
  data = db
    .query(`SELECT * FROM  users`)
    .then(result => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch(err => {
      console.log(err, "Failed To connect");
    });
  return data;
};

const createUser = userdata => {
  console.log(userdata, "userdata at signUp");
  let { fname, lname, email, password, roleid } = userdata;
  console.log("creating user...");
  let data;
  // bcrypt.hashSync(password, 10, (err, hash) => {
  //   console.log("hasshhhhhh function");
  //   if (err) throw err;
  //   let query = `INSERT into users VALUES ('${fname}','${lname}','${email}','${hash}')`;
  //   data = db
  //     .query(query)
  //     .then(result => {
  //       return { msg: "successflly Registered.. ", created: true };
  //     })
  //     .catch(err => {
  //       console.log("unable To create user.");
  //       return { msg: "unable to create User.. ", created: false };
  //     });
  // });
  let hash = bcrypt.hashSync(password, 10);
  let query = `INSERT into users(fname,lname,email,password,roleId) VALUES ('${fname}','${lname}','${email}','${hash}' , '${roleid}')`;
  data = db
    .query(query)
    .then(result => {
      return { msg: "successflly Registered.. ", created: true };
    })
    .catch(err => {
      console.log("unable To create user.", err);
      return { msg: "unable to create User.. ", created: false };
    });

  return data;
};

const verifyUser = async user => {
  let data;
  let { email, password } = user;
  // let hash = bcrypt.hashSync(password, 10);
  // console.log("hash", hash);
  // console.log("passHashed..", user.password);

  console.log("checking user");

  let query = `SELECT * from users INNER JOIN premissions on users.roleid = premissions.roleid where users.email='${email}'`;
  data = db
    .query(query)
    .then(async result => {
      if (result.rows.length > 0) {
        console.log("SSS", result.rows[0].password, password);
        if (bcrypt.compareSync(password, result.rows[0].password)) {
          // console.log("Pas", result.rows[0].password, hash);
          let token = jwt.sign(result.rows[0], "SECRECT", { expiresIn: "1h" });

          let permissions = {
            add: result.rows[0].add,
            edit: result.rows[0].edit,
            delete: result.rows[0].delete,
            roleid: result.rows[0].roleid
          };
          return {
            valid: true,
            msg: "successful Login...",
            token: token,
            userid: result.rows[0].userid,
            permissions: permissions
          };
        } else {
          console.log(result.rows[0].password, password);
          return { valid: false, msg: "password Incorrect.", token: null };
        }
      } else {
        return {
          valid: false,
          msg: "No user with such Email Exits..please Register",
          token: null
        };
      }
    })
    .catch(err => {
      console.log("failed to load db data..", err);
      return {
        valid: false,
        msg: "Unable to Fetch details.. try after SomeTime..",
        token: null
      };
    });
  return data;
};
// const getPermissions = roleid => {
//   let query = `SELECT * from premissions WHERE roleid='${roleid}'`;
//   let data = db
//     .query(query)
//     .then(result => result.rows[0])
//     .catch(err => {
//       console.log(err, "error");
//     });
//   return data;
// };

const setNewPassword = user => {
  let { email, newpassword, otp } = user;
  let hash = bcrypt.hashSync(newpassword, 10);
  let data;
  let query = `UPDATE users SET password='${hash}' WHERE email='${email}'`;
  // if (nodemailer.verifyOTP(otp)) {
  data = db
    .query(query)
    .then(result => {
      console.log(result, "resiult");
      return { msg: "successfully Changed Password..", update: true };
    })
    .catch(err => {
      console.log(err, "Error");
      return { msg: "unable to change Password ..", update: false };
    });
  // } else {
  //   return { msg: "WRONG OTP", update: false };
  // }

  return data;
};

const resetMailSender = email => {
  let query = `SELECT * FROM users WHERE email='${email}'`;

  let mdata, data;
  data = db
    .query(query)
    .then(result => {
      let temp;
      // console.log(result, "result");
      if (result.rows.length > 0) {
        mdata = nodemailer.resetMail(email);
        temp = mdata
          .then(res => {
            console.log(res, "Result..");
            return { mailed: true, msg: "Successfully Sent Mail...." };
          })
          .catch(err => {
            console.log(err);
            return { mailed: false, msg: "Failed to send Mail...." };
          });
      } else {
        return { mailed: false, msg: "No user Found" };
      }
      return temp;
    })
    .catch(err => {
      console.log(err, "error");
      return {
        mailed: false,
        msg: "unable To Send Mail Try again.."
      };
    });
  return data;
};

const deleteUser = userid => {
  let query = `DELETE FROM users WHERE userid='${userid}'`;
  let data = db
    .query(query)
    .then(result => {
      return { msg: "User Deleted", deleted: true };
    })
    .catch(err => {
      console.log(err, "ERror");
      return { msg: "User can't be Deleted", deleted: false };
    });
  return data;
};

const changeRole = (userid, roleid) => {
  console.log("edit user");
  let query = `UPDATE users SET roleid='${roleid}' WHERE userid='${userid}'`;
  let data = db
    .query(query)
    .then(result => {
      // console.log(result);
      return { msg: "changed role succesfully", edited: true };
    })
    .catch(err => {
      console.log("Error:", err);
      return { msg: "unable to changerole.", edited: false };
    });
  return data;
};

// MODULE EXPORTS

module.exports = {
  getUsers,
  verifyUser,
  createUser,
  setNewPassword,
  resetMailSender,
  deleteUser,
  changeRole
};
