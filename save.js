var Game= require("./game")

class Save
{
	constructor(jeu)
	{
		if(jeu.list!=undefined)
		{
			this.game=jeu
			this.etape=0
		}
		else
		{
			Object.assign(this, jeu)
		}
	}
	getState()
	{
		return {
			list: this.game.list,
			etape : this.etape,
			nbLivre: this.game.nbLivre
		}
	}
}
module.exports=Save