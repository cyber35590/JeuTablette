var Etape = require('./etape')
const database=require("./database.js");

const DecalogSession = require("./session")
var session = DecalogSession.new();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max-min) + min);
}


const DEFAULT_GAME={
	count: 10,
	name:"default",
	affichage : null
}

const TITRE="TITRE"
const AUTEUR="AUTEUR"
const COTE="COTE"
const COUVERTURE="COUVERTURE"

class Game
{
	constructor(opt)
	{
		this.list=[]
		this.dbSize=Object.keys(database).length
		this.opt={}
		Object.assign(this.opt, DEFAULT_GAME, opt)
		this.name=this.opt.name
		this.nbLivre= this.opt.count
		
		for(var i=0; i<this.opt.count; i++)
		{
			while(true)
			{
				var index =  Object.keys(database)[getRandomInt(0, this.dbSize)]
				var affichage=this.opt.affichage
				if(affichage==null)
				{
					affichage=[]
					var nbAlea =(getRandomInt(1,9))
					switch (nbAlea) {
					  	case 1:
					   	affichage.push(TITRE, AUTEUR)
					    	break;
					  	case 2:
					  	 affichage.push(TITRE, COTE)
					    	break;
					  	case 3:
					    	affichage.push(COUVERTURE)
					    	break;
					  	case 4:
					    	affichage.push(TITRE, COTE, AUTEUR)
					  	break;
					  	case 5:
					    	affichage.push(TITRE, COTE, COUVERTURE)
					  	break;
					  	case 6:
					    	affichage.push(COTE, COUVERTURE)
					  	break;
					  	case 7:
					    	affichage.push(AUTEUR, COUVERTURE)
					  	break;
					  	case 8:
					    	affichage.push(TITRE, COTE, AUTEUR, COUVERTURE)
					  	break;
					 	default:
					 	alert("Erreur");
					}
				}
				var ret = session.search(index)
				if(ret==undefined || ret==null || !ret.record.disponible)
				{
					console.log(index + " inexistant")
					continue
				}
				console.log(i + "/" + this.opt.count)
				this.list.push({
				  	livre: database[index],
				  	affichage: affichage
			 	 })
				break
			}
		}
	}
	getList()
	{
		return this.list
	}
}
module.exports=Game