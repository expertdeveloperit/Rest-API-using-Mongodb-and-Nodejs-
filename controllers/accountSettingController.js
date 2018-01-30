import bcrypt from 'bcryptjs';
import User from '../models/userModel';

module.exports = {


    /**
     * Handle Change Password Request 
     * 1.Get the user email and check in database.
     * 2.encrypt the password and match with password from database.
     * 3.save the new encrypted password to the database.
     **/

    changePassword(user, req, res, next) {
        var userid = user._id;
        var oldPassword = req.body.oldPassword;
        var newPassword = req.body.newPassword;

        User.findOne({"_id": userid}, function(err, data) {         
            if (err) {
                res.status(500).json({
                    status:false,
                    error: err.message
                });
            } else {
                var password = data.password;
                bcrypt.compare(oldPassword, password, function(err, isMatch) {
                    if (!err && isMatch) {
                        var newHashPassword = bcrypt.hashSync(newPassword, 10);
                        User.findOneAndUpdate({
                            _id: userid
                        }, {
                            password: newHashPassword
                        }, function(err) {
                            if (err) throw err;
                            res.status(200).json({
                                status: true,
                                message: 'Updated Sucessfully.'
                            });
                        });
                    } else {
                        res.status(400).json({
                            status: false,
                            message: "Invalid old password"
                        });
                    }
                })
            }
        });

    },

    /**
     * Handle Change Email Request 
     * 1.Get the user id and check in database.
     * 2.if data exists update the email id of user
    **/

    updateAccount(user,req,res,next){
        var userid = user._id;
        var email = req.body.email;
        User.findOne({"_id": userid},function(err, data) {   
            if (err) {
                res.status(500).json({
                    status:false,
                    error: err.message
                });
            } else {
              User.findOneAndUpdate({_id: userid}, { email }, function(err) {
                         if (err){
                            res.status(500).json({
                                status:false,
                                error: err.message
                            });
                         }
                         res.status(200).json({
                                status: true,
                                message: 'Updated Sucessfully.'
                            });
                        });
                    } 
        });

    },

     /**
     * Handle delete account Request 
     * 1.Get the user id form token and check in database
     * 2.Remove the user profile .
     **/

    deleteAccount(user, req, res, next) {
        
        User.findOneAndRemove({"_id": user._id})
            .then(data => {
                          res.status(200).json({
                            status: true,
                            message: "User Profile deleted successfully"                           
                        });
                  })
            .catch(err => 
                res.status(500).json({
                    status: false,
                    error: err.message
                })
            )
    }
}