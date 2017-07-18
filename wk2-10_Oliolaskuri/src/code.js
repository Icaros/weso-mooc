function init() {
  var laskin = new Laskin();
  var nappi = document.getElementById('nappi');
  nappi.addEventListener('click', function() {
    laskin.etene();
    document.getElementById('laskuri').innerHTML = laskin.laskuri;
  }, false);
}

function Laskin() {
  this.laskuri = 0;
}

Laskin.prototype.etene = function () {
  this.laskuri++;
};
