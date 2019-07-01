const DecalogSession = require("./session")
var y = DecalogSession.new();


var ret = y.search("0013137894")
ret.downloadCover()


console.log(ret) 
