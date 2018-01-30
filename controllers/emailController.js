import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import config from '../config/';
import passport from 'passport';
import randtoken from 'rand-token';

module.exports = {

    /*
     * Handle Forgot password Request .
     * 1. Find User email And Send email to the user
          entered(registered email) with reset link.
    */

    forgotPassword(req, res, next) {

        var email = req.body.email;
        User.findOne({
            email
        }, function(err, user) {
            if (!user) {
                res.status(401).json({
                    status: false,
                    message: "No user Found"
                });
            } else {
                var token = randtoken.generate(16);
                User.findByIdAndUpdate({
                    _id: user._id
                }, {
                    reset_password_token: token,
                    reset_password_expires: Date.now() + 10800000
                }, ).exec(function(err, new_user) {
                    if (err) {
                        res.json({
                            status: false,
                            message: "Error while sending email"
                        })
                    } else {

                        var transporter = nodemailer.createTransport(config.smtpConfig);
                        // setup email data with unicode symbols

                        var mailOptions = {
                            from: `${config.smtpConfig.auth.user}`, 
                            to: `${email}`, // reciver email
                            subject: 'Reset your Password',
                            html: 
                            `<h1 style="text-align:left; color:#00b9ee;">Risorso</h1>
                             <br><p style="text-align:left;color:#000; font-size:20px;">
                             <b>Hello, there</b></p>
                             <p style="text-align:left;color:#000; font-size: 14px;><b>We are sorry that you forgot your Password.</b></p><br>
                             <p style="text-align:left;color:#000; font-size: 14px;>But Don't worry you can reset by using the following Button with in 3 hours.</p>
                             <div style="display:inline-block;background:#00b9ee; padding:10px;-webkit-border-radius: 10px; -moz-border-radius: 4px; border-radius: 4px;">
                             <a  style="text-decoration:none;color:#fff;font-size:15px;" href="http://18.195.238.14:1337/reset_password/${token}">Reset Password</a>
                             <div>
                             <br><br>
                             <p style="text-align:left;color:#000; font-size: 14px;">
                              <h4>Thanks,</h4>
                              <h4>Risorso Team</h4>
                             </p>`
                        };
                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return res.status(500).josn({
                                    status: false,
                                    message: "Unable to send the email",
                                    error: error
                                });
                            }
                            res.status(200).json({
                                status: true,
                                message: "Reset Link is sent to your email Successfully"
                            });
                        });
                    }
                });
            }
        });
    },


    /*
     * Handle Reset password Request with token in params.
     * 1. Find User email and reset_pasword_token and expiry time.
     * 2. After that update password of the user. 
    */

    resetPassword(req, res, next) {

        User.findOne({
                reset_password_token: req.params.token,
                reset_password_expires: {
                    $gt: Date.now()
                }
            })
            .exec(function(err, user) {
                if (!err && user) {
                    if (req.body.newPassword === req.body.verifyPassword) {
                        user.password = bcrypt.hashSync(req.body.newPassword, 10);
                        user.reset_password_token = undefined;
                        user.reset_password_expires = undefined;
                        user.save(function(err) {
                            if (err) {
                                return res.status(422).send({
                                    error: err
                                });
                            } else {
                                var data = {
                                    to: user.email,
                                    from: config.smtpConfig.auth.user,
                                    subject: 'Password Reset Confirmation Email',
                                    html: 
                                    `<h1 style="text-align:left; color:#00b9ee;">Risorso</h1>
                                    <p style="text-align:left;color:#000; font-size: 20px;>
                                    Hello, there
                                    </p>
                                    <p style="text-align:left;color:#000; font-size: 14px;>
                                     Your password is reset Successfully.
                                    </p>
                                    <br><br>
                                    <p style="text-align:left;color:#000; font-size: 14px;">
                                    <h4>Thanks,</h4>
                                    <h4>Risorso Team</h4>
                                    </p>`
                                };

                                var transporter = nodemailer.createTransport(config.smtpConfig);
                                // setup email data with unicode symbols

                                // send mail with defined transport object
                                transporter.sendMail(data, (error, info) => {
                                    if (error) {
                                        return res.status(500).send({
                                            error: error
                                        });
                                    }
                                    res.json({
                                        status: true,
                                        message: "Confirmation email is sent"
                                    });
                                });
                            }
                        });
                    } else {
                        return res.status(422).send({
                            message: 'Passwords do not match'
                        });
                    }
                } else {
                    return res.status(400).send({
                        message: 'Password reset token is invalid or has expired.'
                    });
                }
            });
    },




}