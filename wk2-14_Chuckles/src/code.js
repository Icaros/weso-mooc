var chuckles = {};

chuckles.gui = (function () {
  function show() {
    var chucklesElement = document.getElementById("chuckles");

    clear(chucklesElement);
    populate(chucklesElement);
  }

  function clear(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function populate(element) {
    var chucks = chuckles.data.list();
    for (var i = 0; i < chucks.length; i++) {
      addChuckle(element, chucks[i]);
    }
  }

  function addChuckle(element, chuckle) {
    // do something relevant here
    var textElement = document.createElement("p");
    var textNode = document.createTextNode(chuckle);
    textElement.appendChild(textNode);
    element.appendChild(textElement);
  }

  return {
    show: show
  };

})();

chuckles.data = (function (displayHook) {
  // toteuta tehtävän vaatima toiminnallisuus tänne -- ota myös selvää
  // mikä ihme tuo displayHook on

  // tutustu myös ylläolevaan chuckles guihin -- siinä on hyötyä huomattavasti
  // jos data tarjoaa list-funktion, millä mahdolliseen dataan pääsee käsiksi
  var chuck = new Array();

  function load(url) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
      if(req.readyState !== this.DONE) {
        console.log("state " + req.readyState);
        return false;
      }

      if(req.status !== 200) {
        console.log("status " + req.status);
        return false;
      }

      var data = JSON.parse(req.responseText);
      for(var i = 0; i < data.value.length; i++) {
        chuck.push(data.value[i].joke);
      }

      displayHook();
    }

    req.open("GET", url);
    req.send();
  }

  function list() {
    return chuck;
  }

  return {
    load: load,
    list: list
  };


})(chuckles.gui.show);

function init() {
  var url = "http://api.icndb.com/jokes/random/3";

  chuckles.data.load(url);
}
