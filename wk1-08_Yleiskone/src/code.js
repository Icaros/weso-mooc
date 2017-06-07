function init() {

  var pageHeader = document.createElement("header");
  pageHeader.appendChild(document.createElement("h1"))
            .appendChild(document.createTextNode("Home"));

  var pageContent = document.createElement("p");
  pageContent.appendChild(document.createElement("strong"))
             .appendChild(document.createTextNode("Howdy Stranger! This page is to demonstrate some DOM manipulation skills. Every page of this website is only a hidden section controlled by some JavaScript code. One exception is this 'home' page, which is being injected in place for you pleasure ... feel free to get jiggy with it!"));

  document.getElementById('home').appendChild(pageHeader);
  document.getElementById('home').appendChild(pageContent);

  displayArticle(0);
}

function displayArticle(index) {
  var articles = document.getElementsByTagName("section");

  for(var i = 0; i < articles.length; i++) {
    if(index == i) {
      articles[i].className = '';
    } else {
      articles[i].className = 'hidden';
    }
  }
}

function convert(unit) {
  if(unit == 'C') {
    document.getElementById('fahrenheit').value = toFahrenheit();
  } else {
    document.getElementById('celcius').value = toCelcius();
  }
}

function toFahrenheit() {
  return parseFloat(document.getElementById('celcius').value * 9 / 5 + 32).toFixed(1);
}

function toCelcius() {
  return parseFloat((document.getElementById('fahrenheit').value - 32) * 5 / 9).toFixed(1);
}

function measure(unit) {
  if(unit == 'F') {
    document.getElementById('meters').value = toMeters();
  } else {
    document.getElementById('feet').value = toFeet();
  }
}

function toMeters() {
  return parseFloat(document.getElementById('feet').value * 0.3048).toFixed(1);
}

function toFeet() {
  return parseFloat(document.getElementById('meters').value / 0.3048).toFixed(1);
}

function sum() {
  var sum = 0;
  var categories = document.getElementsByClassName('cat');
  for(var i = 0; i < categories.length; i++) {
    if(categories[i].name == 'zero'){
      sum += parseInt(categories[i].value);
    } else if (categories[i].name == 'one') {
      sum += parseInt(categories[i].value) * 1.5;
      console.log(sum);
    } else if (categories[i].name == 'two' || categories[i].name == 'three') {
      sum += parseInt(categories[i].value) * 2;
    }
  }
  document.getElementById('weightResult').innerHTML = sum;
}

var thumbs = 0;

function diggingIt() {
  var ender = '';
  thumbs += 1;

  if(thumbs <= 1) {
    ender = 'Thumb';
  } else if(thumbs < 10) {
    ender = 'Thumbs';
  } else {
    ender = 'Thumbs, Gee!';
  }

  document.getElementById('thumbs').innerHTML = thumbs + " " + ender;
}
