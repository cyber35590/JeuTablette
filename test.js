const DecalogSession = require("./session")
var session = DecalogSession.new();
var ret = session.search("0013136779")
console.log(ret)