"use strict";

var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  User = require("../models/admin.model"),
  passport = require("passport"),
  async = require("async"),
  crypto = require("crypto"),
  ejs = require("ejs"),
  nodemailer = require("nodemailer"),
  smtpTransport = require("nodemailer-smtp-transport");
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "tranphunguyen111@gmail.com",
    pass: "nguyen5398"
  }
});

exports.login_template = function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  }
  return res.render("pages/login/index", {
    title: "Đăng nhập",
    layout: false,
    message: req.flash("loginMessage")
  });
};

exports.register_template = function(req, res) {
  res.render("pages/register/index", {
    title: "Đăng nhập",
    isRegister: false,
    layout: false,
    isSuccess: true
  });
};

exports.forgot_password_template = function(req, res) {
  return res.render("pages/forgotpassword/index", {
    title: "Quên mật khấu",
    layout: false
  });
};

exports.reset_password_template = function(req, res) {
  return res.render("pages/resetpassword/index", {
    title: "Thay đổi mật khẩu",
    layout: false,
    message: null,
    token: req.query.token || ""
  });
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, err => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({ user }, "secret");
      res.cookie("token", token);
      res.cookie = res.cookie("user", user);
      return res.redirect("/dashboard");
    });
  })(req, res);
};

exports.register = function(req, res) {
  User.findOne({ email: req.body.email }, (err, results) => {
    if (results != null) {
      res.render("pages/register/index", {
        title: "Đăng ký thất bại",
        isSuccess: false,
        message: `Email ${req.body.email} đã tồn tại.`,
        layout: false
      });
    } else {
      var newUser = new User(req.body);
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      newUser.save(function(err, user) {
        if (err) {
          res.render("pages/register/index", {
            title: "Đăng ký thất bại",
            isSuccess: false,
            message: "Có lỗi xảy ra trong quá trình đăng ký",
            layout: false
          });
        } else {
          // User.hash_password = undefined;
          req.login(user, err => {
            if (err) {
              res.send(err);
            }
            const token = jwt.sign({ user }, "secret", { expiresIn: 1440 });
            res.cookie("token", token);
            res.cookie("user", user);
            return res.redirect("/dashboard");
          });
        }
      });
    }
  });
};

exports.forgot_password = function(req, res) {
  async.waterfall(
    [
      function(done) {
        User.findOne({
          email: req.body.email
        }).exec(function(err, account) {
          if (account) {
            done(err, account);
          } else {
            done("Tài khoản không tìm thấy.");
          }
        });
      },
      function(account, done) {
        // create the random token
        crypto.randomBytes(20, function(err, buffer) {
          var token = buffer.toString("hex");
          done(err, account, token);
        });
      },
      function(account, token, done) {
        User.findByIdAndUpdate(
          { _id: account._id },
          {
            reset_password_token: token,
            reset_password_expires: Date.now() + 86400000
          },
          {
            upsert: true,
            new: true
          }
        ).exec(function(err, new_account) {
          done(err, token, new_account);
        });
      },
      function(token, account, done) {
        const url =
          "https://" + req.headers.host + "/reset-password?token=" + token;
        var mainOptions = {
          from: "tranphunguyen111@gmail.com",
          to: account.email,
          subject: "Thay đổi mật khẩu",
          html:
            "<div><h3>Xin chào " +
            account.name +
            "</h3><p> Nhấn vào link " +
            url +
            " để tạo lại mật khẩu</p>"
        };
        transporter.sendMail(mainOptions, function(err) {
          if (!err) {
            console.log("main Otiopnsdfsdf", mainOptions.subject);
            return res.json({
              message: "Mời bạn kiểm tra mail để tạo mật khẩu mới!!"
            });
          } else {
            return done(err);
          }
        });
      }
    ],
    function(err) {
      return res.status(422).json({ message: err });
    }
  );
};

/**
 * Reset password
 */
exports.reset_password = function(req, res, next) {
  console.log("token", req.body.token);
  User.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function(err, user) {
    if (!err && user) {
      // user.password = bcrypt.hashSync(req.body.repassword, 10);
      // user.reset_password_token = undefined;
      // user.reset_password_expires = undefined;
      const objUser = {
        password: bcrypt.hashSync(req.body.repassword, 10),
        reset_password_token: undefined,
        reset_password_expires: undefined
      };
      User.findByIdAndUpdate(user._id, objUser, (err, user) => {
        if (err) {
          return res.status(422).send({
            message: err
          });
        } else {
          res.render("pages/infor/index", {
            message:
              "Thay đổi mật khẩu thành công, mời bạn đăng nhập để tiếp tục",
            layout: false
          });
        }
      });
    } else {
      return res.status(400).send({
        message: "Password reset token is invalid or has expired."
      });
    }
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.clearCookie("user");
  res.clearCookie("token");
  res.redirect("/");
};

exports.isLoggedIn = function(req, res, next) {
  // if (req.isAuthenticated()) {
  //   return next();
  // }
  if (true) {
    return next();
  }
  res.redirect("/");
};
