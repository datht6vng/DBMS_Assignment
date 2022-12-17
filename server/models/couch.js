var NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb({
    auth: {
        user: "admin",
        pass: "admin"
    }
});
console.log(couch.listDatabases().then(dbs => {
    console.log("Documents list:", dbs)
}, err => {
    // request error occured
    console.log("Error connecting to couchdb:", err)
}));
module.exports = couch;