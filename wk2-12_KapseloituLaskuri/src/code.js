// function getFunc() {
//   var luku = 0;
//
//   function kasvata() {
//     luku++;
//   }
//
//   function annaLuku() {
//     return luku;
//   }
//
//   return {
//     kasvata: kasvata,
//     annaLuku: annaLuku
//   };
// }
//
// var laskin = getFunc();

var laskin = (function() {
  var luku = 0;

  function kasvata() {
    luku++;
  }

  function annaLuku() {
    return luku;
  }

  return {
    kasvata: kasvata,
    annaLuku: annaLuku
  };
})();


function kasvataJaAseta() {
  laskin.kasvata();
  document.getElementById("laskuri").innerHTML = laskin.annaLuku();
}

function init() {
  var nappi = document.getElementById("nappi");
  nappi.addEventListener("click", kasvataJaAseta, false);
}
