var $getStarted = document.querySelector('.get-started');
var $openingScreen = document.querySelector('.opening-screen');
var $dog = document.querySelector('.dog');
var $body = document.querySelector('body');
var $homeScreen = document.querySelector('.home-screen');
var $dogBreedText = document.querySelector('.dog-breed-text');
var breed = null;
var $random = document.querySelector('.random');
var $learnMore = document.querySelector('.breed-info');

$getStarted.addEventListener('click', openApp);
$random.addEventListener('click', random);
/* $learnMore.addEventListener('click', infoModal); */

var xhr = null;

function openApp(event) {
  xhr = getDogPic();
  $openingScreen.setAttribute('class', 'opening-screen row container hidden');
  $body.setAttribute('class', 'background-color-gray');
  $homeScreen.setAttribute('class', 'home-screen');
}

function getDogPic() {
  var xhr = new XMLHttpRequest();
  xhr['x-api-key'] = '9c73ad28-2006-43c9-8f08-9e2c96fc540a';
  xhr.open('GET', 'https://api.thedogapi.com/v1/images/search');
  xhr.responseType = 'json';
  xhr.addEventListener('load', breedName);
  xhr.send();
  return xhr;
}

function breedName(event) {
  if (xhr.response[0].breeds[0]) {
    breed = xhr.response[0].breeds[0].name;
    $learnMore.textContent = 'Click here to learn more!';
  } else {
    breed = 'Unknown';
    $learnMore.textContent = null;
  }
  $dogBreedText.textContent = breed;
  $dog.setAttribute('src', xhr.response[0].url);
}

function random(event) {
  xhr = getDogPic();
}
