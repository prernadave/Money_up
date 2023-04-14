
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const passport=require("passport");
const { v4: uuidv4 } = require('uuid');
const { userModel } = require('../model/user-SignUP-Model');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:9168/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    
    let email=profile._json.email;
    let name=profile.displayName
  
      const user=new userModel({
        name,
        email,
        mob_no:"NA",
        dob:"NA",
        password:uuidv4()
        
      });
      await user.save()
      return cb(null, user);
  }
));


module.exports = { passport };

