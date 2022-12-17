var bcrypt = require('bcrypt-nodejs');

var encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
var validPassword = function (password, hashed) {
    return bcrypt.compareSync(password, hashed);
};

module.exports = { encryptPassword, validPassword };