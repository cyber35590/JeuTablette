var liste ={}
//var HOSTURL = window.location.origin;

$( document ).ready(function() {
	afficherPartie()
	placerParties()
});

function afficherPartie()
{
	liste = $.ajax({ url:"/list", async: false}).responseJSON

	var tr = $("<table/>")
	var th=$("<tr><th> Liste des parties | </th><th>| Etapes </th></tr>")

	tr.append(th)

	for(var i in liste)
	{
		td=$("<tr><td><a href='/jeu.html?name="+ liste[i].name + "'>" + liste[i].name + "</td><td>" + liste[i].nbLivre + "</td></tr>")
		tr.append(td)
		console.log(i)
	}
	tbody=$("#listeParties")
	return tr
}
function placerParties()
{
	tbody=$("#listeParties")
	if(liste.length>0)
	{
		tbody.append(afficherPartie(liste))
	}
	else
	{
		tbody.append(" AUCUNE PARTIE DE CREEE ")
	}
}
