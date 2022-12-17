// load các module
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var hash = require("./hash");
var couch = require("../models/couch");
// passport session setup
// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
// used to deserialize the user
passport.deserializeUser(async function (id, done) {
  couch.get("user", id).then(({data, headers, status}) => {
    done(null, data)
}, err => {
    // either request error occured
    // ...or err.code=EDOCMISSING if document is missing
    // ...or err.code=EUNKNOWN if statusCode is unexpected
    done(err, null);
});
});
// local sign-in
passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {

      const query = {
        selector: {
          email: email
        }
      };
      couch.mango("user", query).then(async ({ data, headers, status }) => {
        // data is json response
        // headers is an object with all response headers
        // status is statusCode number
        let user = data.docs[0];
        if (!user) {
          return done(null, false);
        }
        try {
          let isValid = hash.validPassword(password, user.password)
          if (!isValid) {
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }, err => {
        // either request error occured
        // ...or err.code=EDOCMISSING if document is missing
        // ...or err.code=EUNKNOWN if statusCode is unexpected
        return done(err);
      });
      // User.findOne({ email: email }, function (err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false);
      //   }
      //   try {
      //     if (!user.validPassword(password)) {
      //       return done(null, false);
      //     }
      //   } catch (err) {
      //     return done(err);
      //   }
      //   return done(null, user);
      // });
    }
  )
);