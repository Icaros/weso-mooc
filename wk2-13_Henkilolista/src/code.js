var manager = {};

manager.domain = {};
manager.domain.Person = function (name, address) {
    this.name = name;
    this.address = address;
}

manager.domain.Person.prototype.toString = function () {
    return this.name + " (" + this.address + ")";
}


manager.gui = (function () {
    function update() {
        var personsElement = document.getElementById("persons");
        clear(personsElement);

        populate(personsElement);
    }

    function clear(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function populate(element) {
        var persons = manager.data.list();
        for (var i = 0; i < persons.length; i++) {
            addPersonToElement(element, persons[i]);
        }
    }

    function addPersonToElement(element, person) {
        var textElement = document.createElement("p");
        var textNode = document.createTextNode(person.toString());
        textElement.appendChild(textNode);

        element.appendChild(textElement);
    }

    function buttonPressed() {

        var name = document.getElementById('name').value;
        var address = document.getElementById('address').value;
        var person = new manager.domain.Person(name, address);
        manager.data.add(person);
    }

    return {
        buttonPressed: buttonPressed,
        update: update
    };
})();

manager.data = (function (updateHook) {
    var persons = new Array();

    function addPerson(person) {
      persons.push(person);
      updateHook();
    }

    function list() {
      return persons;
    }

    return {
      add: addPerson,
      list: list
    };

})(manager.gui.update);

function init() {
    var addPersonButton = document.getElementById("add-person");
    addPersonButton.addEventListener("click", manager.gui.buttonPressed, false);
}
