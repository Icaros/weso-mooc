var chat = {};

// ************************** //
// Handle GUI events
// ************************** //
chat.gui = (function() {

  function loginButtonPressed() {
    var nick = document.getElementById('nick').value;
    var loginData = {
      nickname: nick
    }

    chat.io.sendAuth(loginData);
  }

  function sendButtonPressed() {
    var nick = document.getElementById('nick').value;
    var message = document.getElementById('message').value;

    var data = {
      nickname: nick,
      message: message
    }

    chat.data.send(data);
  }

  function refreshButtonPressed() {
    chat.io.update();
  }

  function logoutButtonPressed() {
    document.getElementById('chat').className = 'hidden';
    document.getElementById('login').className = '';
    document.getElementById('message').value = '';
    document.getElementById('nick').value = '';
  }

  function show() {
    var messagesElement = document.getElementById('chatdata');

    clear(messagesElement);
    populate(messagesElement);
  }

  function clear(element) {
    document.getElementById('message').value = '';

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function populate(element) {
    var messages = chat.data.list();
    for(var i = 0; i < messages.length; i++) {
      addMessage(element, messages[i]);
      console.log(messages[i]);
    }
  }

  function addMessage(element, msg) {
    var textElement = document.createElement('p');

    var hours = new Date(msg.timestamp).getHours();
    hours = (hours >= 10) ? hours : '0' + hours;
    var minutes = new Date(msg.timestamp).getMinutes();
    minutes = (minutes >= 10) ? minutes : '0' + minutes;
    var seconds = new Date(msg.timestamp).getMinutes();
    seconds = (seconds >= 10) ? seconds : '0' + seconds;

    var timestamp = document.createTextNode(hours + ':' + minutes + ':' + seconds + ' ');
    textElement.appendChild(timestamp);
    var nickname = document.createTextNode('<' + msg.nickname + '>');
    textElement.appendChild(nickname);
    var message = document.createTextNode(' ' + msg.message);
    textElement.appendChild(message);

    element.appendChild(textElement);
  }

  return {
    login: loginButtonPressed,
    send: sendButtonPressed,
    refresh: refreshButtonPressed,
    logout: logoutButtonPressed,
    show: show
  };

})();

// ****************** //
// Check server status
// ****************** //
chat.io = (function() {

  function sendAuth(loginData) {

    var jsondata = JSON.stringify(loginData);

    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();

      req.open('POST', 'http://bad.herokuapp.com/app/auth');

      req.onload = function() {
        if(req.status == 200) {
          resolve(req.response);
          chat.controller.login();
        } else {
          reject(Error(req.statusText));
        }
      };

      req.onerror = function() {
        reject(Error("Network Error"));
      };

      req.setRequestHeader('Content-Type', 'application/json');
      req.send(jsondata);
    });
  }

  function update() {
    chat.data.load();
    chat.gui.show();
  }

  return {
    sendAuth: sendAuth,
    update: update
  };

})();

// ********************************* //
// Load earlier messages from server
// ********************************* //
chat.data = (function(displayHook) {

  var messages;

  function load() {
    messages = new Array();
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
      if(req.readyState !== this.DONE) {
        console.log('state ' + req.readyState);
        return false;
      }

      if(req.status !== 200) {
        console.log('status ' + req.status);
        return false;
      }

      var data = JSON.parse(req.responseText);
      for(var i = 0; i < data.length; i++) {
        messages.push(data[i]);
      }
      displayHook();
    }

    req.open("GET", 'http://bad.herokuapp.com/app/messages');
    req.send();
  }

  function send(data) {
    var jsondata = JSON.stringify(data);

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

      chat.io.update();
      displayHook();
    }

    req.open("POST", "http://bad.herokuapp.com/app/messages");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(jsondata);
  }

  function list() {
    return messages;
  }

  return {
    load: load,
    send: send,
    list: list
  };

})(chat.gui.show);


// *********************** //
// Handle login and logout
// *********************** //
chat.controller = (function() {

  function login() {
    document.getElementById('login').className = 'hidden';
    document.getElementById('chat').className = '';

    var sendButton = document.getElementById('send_btn');
    sendButton.addEventListener('click', chat.gui.send, false);
    var refreshButton = document.getElementById('refresh_btn');
    refreshButton.addEventListener('click', chat.gui.refresh, false);
    var logoutButton = document.getElementById('logout_btn');
    logoutButton.addEventListener('click', chat.gui.logout, false);

    chat.data.load();
  }

  function logout() {

  }

  return {
    login: login,
    logout: logout
  };

})();

// **************** //
// Init application
// **************** //
function init() {
  var loginButton = document.getElementById('login_btn');
  loginButton.addEventListener('click', chat.gui.login, false);
  document.getElementById('chat').className = 'hidden';
}
