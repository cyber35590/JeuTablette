const DecalogSession = require("./session")
var session = DecalogSession.new();
const Game = require('./game');
const fs = require('fs');
var https = require('https');
const path = require('path');
var Save = require("./save")
const chemin = "sauvegarde.json"
var privateKey  = fs.readFileSync('key/private.key', 'utf8');
var certificate = fs.readFileSync('key/certificat.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var game={cookieEnreg:{}, game:{default:new Game()}}
const express = require('express');
const app = express();
var httpsServer = https.createServer(credentials, app);
loadGame()
console.log(game)

function getRandomInt() {
  return Math.floor(Math.random() * (9999999999999999));
}

function verifierCookie(req, res)
{
	if(req.headers["Cookie"]!=undefined || req.headers["cookie"]==undefined)
  	{
  		res.header("Set-Cookie", "TEST=Bonjour")
  		console.log("Pas de cookies")
  	}
  	else
  	{
  		console.log("Cookie")
  	}
}

function createNewSession(res)
{
  var nb=getRandomInt()
  res.header("Set-Cookie", "ID="+nb+'; path=/')
  return cookie=nb
}

function parseCookie(str)
{
  var x = str.indexOf("=");
  var key = str.substring(0, x)
  var val = str.substring(x+1, str.length)
  console.log("=============="+str+"======================")
  return val
}

app.use(express.json());

app.get('/list', function(req, res){
  res.type('application/json')
  var ret=[]
  for( var i in Object.keys(game.game))
  {
    var key=Object.keys(game.game)[i]
    ret.push({name:game.game[key].name, nbLivre:game.game[key].nbLivre})
  }
  res.send(JSON.stringify(ret))
})

app.post('/create', function(req, res){
  game.game[req.body.name]= new Game(req.body)
  res.send("");
  //console.log(game.game)
});

app.get('/begin',handleBegin)
app.get('/begin/:name',handleBegin)

function handleBegin (req, res) {
  res.type('application/json');
  var cookie="" 
  if(req.headers["Cookie"]==undefined && req.headers["cookie"]==undefined)
  {
    cookie=createNewSession(res)
  }
  else
  {
    if(req.headers["Cookie"])
      {
       cookie=parseCookie(req.headers["Cookie"])  
      }
      if(req.headers["cookie"])
      {
       cookie=parseCookie(req.headers["cookie"])  
      }
    console.log("cookie " + req.headers["Cookie"] + " " + req.headers["cookie"] )
    if(!game.cookieEnreg[cookie]) 
    {
      console.log("B '"+cookie+"'")
      cookie=createNewSession(res)
    }
  }
  var name = req.params.name
  if(name == undefined)
    { 
      name = "default"
    }
    if(game.game[name])
    {
      var save = new Save(game.game[name])
      game.cookieEnreg[cookie]=save
      res.send(save.getState());
    }
    else
    {
      res.status(401)
      res.send(JSON.stringify({ code: 401, message:"Aucune partie de ce nom"}));
      console.log('Erreur, aucune partie de ce nom')
    }
  
}
app.get('/document/:code', function (req, res) {
  res.type('application/json');
  if(req.headers["Cookie"]==undefined && req.headers["cookie"]==undefined)
  {
    createNewSession(res)
  	console.log("Pas de cookies2")
  }
  else
  {
  	console.log("Cookie2")
  }
   var ret = session.search(req.params.code)
  res.send(ret);
})

function loadGame()
  {
    if(fs.existsSync(chemin))
    {
      Object.assign(game, JSON.parse(fs.readFileSync(chemin)))
    }
  }

function saveGame()
  {
    // var base=game.game.db
    // game.game.db = undefined
    fs.writeFileSync(chemin, JSON.stringify(game))
    //game.game.db=base
    console.log(game.cookieEnreg)
  } 

app.get('/reprendre', function (req, res) {
  res.type('application/json');
  var cookie="" 
  if(req.headers["Cookie"]==undefined && req.headers["cookie"]==undefined)
  {
    res.status(401)
    res.send(JSON.stringify({ code: 401, message:"Pas de session"}));
    console.log('Pas de session')
  }
  else
  {
    if(req.headers["Cookie"])
    {
    cookie=parseCookie(req.headers["Cookie"]) 
    }
    if(req.headers["cookie"])
    {
    cookie=parseCookie(req.headers["cookie"]) 
    }
    if(game.cookieEnreg[cookie])
    {
      var save = new Save(game.cookieEnreg[cookie])
      res.send(save.getState());
    }
    else
    {
      res.status(401)
      res.send(JSON.stringify({ code: 401, message:"Pas de session en cours"}));
      console.log('Pas de session en cours')
    }
  }
  
})

app.get('/valid/:etape', function (req, res) {
  res.type('application/json');
  var cookie=""
  console.log(req.headers["Cookie"])
  console.log(req.headers["cookie"])
 if(req.headers["Cookie"]==undefined && req.headers["cookie"]==undefined)
  {
    res.status(401)
    res.send(JSON.stringify({ code: 401, message:"Pas de cookie de session"}));
    console.log('Pas de cookie de session')
    console.log(req.headers["cookie"])
  }
  else
  {
    if(req.headers["Cookie"])
    {
      cookie=parseCookie(req.headers["Cookie"]) 
    }
    if(req.headers["cookie"])
    {
      cookie=parseCookie(req.headers["cookie"]) 
    }
    if(game.cookieEnreg[cookie])
    {
      var save = new Save(game.cookieEnreg[cookie])
      save.etape++
      game.cookieEnreg[cookie] = save
      res.send(save.getState());
    }
    else
    {
      res.status(401)
      res.send(JSON.stringify({ code: 401, message:"Mauvais cookie"}));
      console.log('Mauvais cookie : ')
      console.log(req.headers)
    }
  }
  saveGame()
})

function timeSet()
{

}

app.use('/', express.static(__dirname + '/www'));
/*
app.listen(8080, function () {
  console.log('Example app listening on port 3000!')
})*/
httpsServer.listen(443);

