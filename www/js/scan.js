var videoReady=false

function livreSuivant()
{
    validerLivreCourant()
    afficherChargement()
    jouer()
}

var decodeCallback = function (ptr, len, resultIndex, resultCount) {
  var result = new Uint8Array(ZXing.HEAPU8.buffer, ptr, len);
  var result_str=String.fromCharCode.apply(null, result)

  barcode_result.textContent = String.fromCharCode.apply(null, result);
  buttonGo.disabled = false;
  if(data.etape == data.nbLivre)
  {
    EndGame()
  }
  if(result_str == data.list[data.etape].livre.isbn || result_str == data.list[data.etape].livre.code)
  {
    livreSuivant()
  }
  else
  {
    alert("Mauvais livre, veuillez réessayez")
    afficherChargement()
    afficherInfo()
    scanBarcode()
  }
};
function EndGame()
{
  alert("Bravo, vous avez gagné !")
  window.location.href =HOSTURL+"/accueil.html"
}
function onVideoReady()
{
  videoReady=true
}

function waitForVideoReady()
{
  //while(!videoReady);
}
