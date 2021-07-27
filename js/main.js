var $getStarted = document.querySelector('.get-started');
var $openingScreen = document.querySelector('.opening-screen');
var $dog = document.querySelector('.dog');
var $body = document.querySelector('body');
var $homeScreen = document.querySelector('.home-screen');

var xhr = getDogPic();

$getStarted.addEventListener('click', openApp);

function openApp(event) {
  $openingScreen.setAttribute('class', 'opening-screen row container hidden');
  $body.setAttribute('class', 'background-color-gray');
  $homeScreen.setAttribute('class', 'home-screen');
  $dog.setAttribute('src', xhr.response[0].url);
}

function getDogPic() {
  var xhr = new XMLHttpRequest();
  xhr['x-api-key'] = '9c73ad28-2006-43c9-8f08-9e2c96fc540a';
  xhr.open('GET', 'https://api.thedogapi.com/v1/images/search');
  xhr.responseType = 'json';
  xhr.send();
  return xhr;
}
