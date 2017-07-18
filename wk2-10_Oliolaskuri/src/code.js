function init() {
  var calc = new Calc();
  var button = document.getElementById('nappi');
  nappi.addEventListener('click', function() {
    laskin.add();
    document.getElementById('laskuri').innerHTML = laskin.val;
  }, false);
}

function Calc() {
  this.val = 0;
}

Calc.prototype.add = function () {
  this.val++;
};
