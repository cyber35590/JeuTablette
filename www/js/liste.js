var ip = "192.168.1.14"
var data = {}
var isbnSaisi = {}
var nomPartie ={}
var dispo = {}
var etat = {}

$( document ).ready(function() {
	afficherInfo()
	$(".select").hide(1000)
	if(findGetParameter("reprendre") == true)
	{
		reprendre()
	}
	else
	{
		commencer()
	}
});
function cacherScene()
{
	afficherInfo()
}

function afficherScene()
{
	afficherCamera()
	 isPaused = false;
    scanBarcode();
  buttonGo.disabled = false;
}

function camera()
{
	$(".select").toggle(1000)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max-min) + min);
}

function dataToHtml(o)
{
	const TITRE="TITRE"
	const AUTEUR="AUTEUR"
	const COTE="COTE"
	const COUVERTURE="COUVERTURE"

	var th=$("<tr><th> Auteur : </th></tr>")
	var th1=$("<tr><th> Titre : </th></tr>")
	var th2=$("<tr><th> Cote : </th></tr>")
	var th3=$("<tr><th> Couverture : </th></tr>")
	var tr = $("<table/>");
	var td= $("<tr><td>" + o.livre.auteur + "</td></tr>");
	var td1= $("<tr><td>" + o.livre.titre + "</td></tr>");
	var td2= $("<tr><td>" + o.livre.cote + "</td></tr>");
	var td3= $("<tr>");
	td3.append($('<td><br><img src="' + o.image + '"></img>'+"</td></tr>"));
	console.log(o.affichage)


	console.log("affichage")
	console.log(o.affichage)
	if(o.affichage.indexOf(AUTEUR)>=0)
		{
			tr.append(th)
			tr.append(td)
		}
	if(o.affichage.indexOf(TITRE)>=0)
		{
			tr.append(th1)
			tr.append(td1)
		}
	if(o.affichage.indexOf(COTE)>=0)
		{
			tr.append(th2)
			tr.append(td2)
		}
	if(o.affichage.indexOf(COUVERTURE)>=0)
		{
			tr.append(th3)
			tr.append(td3)
		}
	

	return tr
}

function validerLivreCourant()
{
	etat = $.ajax({ url:"https://"+ ip +"/valid/"+ (data.etape+1), async: false}).responseJSON
	data.etape++
}

function traitement()
{
	isbnSaisi=document.getElementById('isbnASaisir').value
	if(isbnSaisi == data.list[data.etape].livre.isbn)
	{
		livreSuivant()
	}
	else
	{
		alert("Mauvais livre, veuillez réessayer")
		afficherChargement()
    	afficherInfo()
	}
}

function commencer()
{	
	data = $.ajax({ url:"https://"+ ip +"/begin/"+GetPartieName(), async: false}).responseJSON
	data.nbLivre=  data.list.length//parseInt($("#nbLivre").val())
  	tbody=$('#info')
	data.etape = 0
	jouer()
}

function reprendre()
{	
	data = $.ajax({ url:"https://"+ ip +"/reprendre", async: false}).responseJSON
	data.nbLivre= data.list.length //parseInt($("#nbLivre").val())
  	tbody=$('#info')
	jouer()
}

function findGetParameter(parameter) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameter) result = decodeURIComponent(tmp[1]);
    }
    return result=="true" || result=="True";
}

function GetPartieName() {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === "name") result = decodeURIComponent(tmp[1]);
    }
    if(result)
    {
    	return result;
    }
    return("")
}

function jouer()
{
	while(true)
	{
		if(data.etape<data.nbLivre)
		{
			dispo = $.ajax({ url:"https://"+ ip +"/document/" + data.list[data.etape].livre.code, async: false}).responseJSON
			data.list[data.etape].image=dispo.images.best

			if(dispo.record.disponible)
			{
				afficherInfo()
				tbody.empty()
				tbody.append(dataToHtml(data.list[data.etape]))
				return true
			}else
			{
				validerLivreCourant()
				console.log("Indisponible etape="+data.etape)
				
			}
		}
		else
		{
			alert("Bravo, vous avez gagné !")
			window.location.href="https://" + ip + "/accueil.html"
			return false
		}

	}
}

function afficherCommencer()
{
	 data.nbLivre= parseInt($("#nbLivre").val())
	if(document.getElementById('nbLivre').max>=data.nbLivre)
	{
		window.location.href="https://"+ ip +"/jeu.html"
		commencer()
	}
}

function afficherCamera()
{
	$("#camera").show()
    $("#Info").hide()
    $("#loading").hide()
}

function afficherInfo()
{
	$("#camera").hide()
    $("#Info").show()
    $("#loading").hide()
}

function afficherChargement()
{
	$("#camera").hide()
    $("#Info").hide()
    $("#loading").show()
}