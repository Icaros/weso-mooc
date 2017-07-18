function Tavara(nimi, paino) {
  this.nimi = nimi;
  this.paino = paino;
}

function Matkalaukku(maksimipaino) {
  this.maksimipaino = maksimipaino;
  this.tavarat = new Array();
}

Matkalaukku.prototype.lisaa = function(tavara) {
  if(!(tavara instanceof Tavara) || this.tavarat.includes(tavara)) {
    return;
  }

  if(tavara.paino + this.paino() <= this.maksimipaino) {
    this.tavarat.push(tavara);
  }
}

Matkalaukku.prototype.paino = function() {
  var kokonaispaino = 0;
  for(var i = 0; i < this.tavarat.length; i++) {
    kokonaispaino += this.tavarat[i].paino;
  }

  return kokonaispaino;
}

function Ruuma(maksimipaino) {
  this.maksimipaino = maksimipaino;
  this.matkalaukut = new Array();
}

Ruuma.prototype.lisaa = function(matkalaukku) {
  if(!(matkalaukku instanceof Matkalaukku) || this.matkalaukut.includes(matkalaukku)) {
    return;
  }

  if(matkalaukku.paino() + this.paino() <= this.maksimipaino) {
    this.matkalaukut.push(matkalaukku);
  }
}

Ruuma.prototype.paino = function() {
  var kokonaispaino = 0;
  for(var i = 0; i < this.matkalaukut.length; i++) {
    kokonaispaino += this.matkalaukut[i].paino();
  }

  return kokonaispaino;
}

// testikoodi:
var kivi = new Tavara("kivi", 3);
var kirja = new Tavara("kirja", 7);
var pumpuli = new Tavara("pumpuli", 0.001);

var laukku = new Matkalaukku(10);
var vuitton = new Matkalaukku(3);

var schenker = new Ruuma(15);


laukku.lisaa(kivi);
console.log("laukun paino, pitäisi olla 3: " + laukku.paino());
laukku.lisaa(kivi); // virhe: "Tavara lisätty jo, ei onnistu!"

laukku.lisaa(kirja);
console.log("laukun paino, pitäisi olla 10: " + laukku.paino());

laukku.lisaa(pumpuli); // virhe: "Liian painava, ei pysty!"

console.log("laukun paino, pitäisi olla 10: " + laukku.paino());


schenker.lisaa(laukku);
schenker.lisaa(pumpuli); // virhe: Vääränlainen esine, ei onnistu!

console.log("Ruuman paino, pitäisi olla 10: " + schenker.paino());

vuitton.lisaa(pumpuli);
schenker.lisaa(vuitton);
console.log("Ruuman paino, pitäisi olla noin 10.001: " + schenker.paino());

pumpuli.paino = 300;
console.log("Ruuman paino, pitäisi olla 310: " + schenker.paino()); // hups!
