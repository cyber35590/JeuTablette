var HOSTURL = window.location.origin+window.location.pathname;

$.postJSON = function(url, data, args) {
  		args = $.extend({
    	url: url,
    	type: 'POST',
    	data: JSON.stringify(data),
    	contentType: 'application/json; charset=utf-8',
    	dataType: 'json',
    	async: false,
  	}, args);
  	return $.ajax(args);
	};

const TITRE="TITRE"
const AUTEUR="AUTEUR"
const COTE="COTE"
const COUVERTURE="COUVERTURE"

	function getRandomInt() {
  	return Math.floor(Math.random() * (4-1) + 1);
	}

	function envoyerDonnees()
	{
		var a=0, b=0
		var donnees= {count: parseInt($("#nbLivre").val()),
					name:$("#nomPartie").val(),
					affichage: []}

		var nbAlea=0
		var aleaAuteur=1
		var aleaTitre=2
		var aleaCote=3
		var aleaCouverture=4

		if(document.getElementById("auteur").checked == true)
		{
			donnees.affichage.push(AUTEUR)
		}
		if(document.getElementById("titre").checked == true)
		{
			donnees.affichage.push(TITRE)
		}
		if(document.getElementById("couverture").checked == true)
		{
			donnees.affichage.push(COUVERTURE)
		}
		if(document.getElementById("cote").checked == true)
		{
			donnees.affichage.push(COTE)
		}
		if(document.getElementById("aleatoire").checked == true)
		{
			donnees.affichage=null
		}

		console.log(donnees.count)
		x = $.postJSON(HOSTURL+"/create",donnees)
		window.location.href=HOSTURL+"/jeu.html?name="+donnees.name
	}
