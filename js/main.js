var $getStarted = document.querySelector('.get-started');
var $openingScreen = document.querySelector('.opening-screen');
var $dog = document.querySelector('.dog');
var $body = document.querySelector('body');
var $homeScreen = document.querySelector('.home-screen');
var $dogBreedText = document.querySelector('.dog-breed-text');
var breed = null;
var $random = document.querySelector('.random');
var $learnMore = document.querySelector('.breed-info');
var $breedName = document.querySelector('.breed-name');
var $bredFor = document.querySelector('.bred-for');
var $breedHeight = document.querySelector('.breed-height');
var $breedWeight = document.querySelector('.breed-weight');
var $breedTemper = document.querySelector('.breed-temperament');
var $modal = document.querySelector('.modal');
var $exit = document.querySelector('.exit');
var $bookmarkButton = document.querySelector('.bookmark-button');
var $bookmarkIcon = document.querySelector('.bookmark-icon');

$getStarted.addEventListener('click', openApp);
$random.addEventListener('click', random);
$learnMore.addEventListener('click', modal);
$exit.addEventListener('click', exitModal);
$bookmarkButton.addEventListener('click', bookmark);

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
  xhr.addEventListener('load', breedInfo);
  xhr.send();
  return xhr;
}

function breedInfo(event) {
  if (xhr.response[0].breeds[0]) {
    breed = xhr.response[0].breeds[0].name;
    $learnMore.textContent = 'Click here to learn more!';
    $breedName.textContent = breed;
    $bredFor.textContent = xhr.response[0].breeds[0].bred_for;
    $breedHeight.textContent = xhr.response[0].breeds[0].height.imperial + ' inches';
    $breedWeight.textContent = xhr.response[0].breeds[0].weight.imperial + ' lb';
    $breedTemper.textContent = xhr.response[0].breeds[0].temperament;
  } else {
    breed = 'Unknown';
    $learnMore.textContent = null;
  }
  $dogBreedText.textContent = breed;
  $dog.setAttribute('src', xhr.response[0].url);
}

function random(event) {
  xhr = getDogPic();
  $bookmarkIcon.setAttribute('src', 'images/bookmark-plus.png');
}

function modal(event) {
  $modal.setAttribute('class', 'modal');
}

function exitModal(event) {
  $modal.setAttribute('class', 'modal hidden');
}

function bookmark(event) {
  if ($bookmarkIcon.getAttribute('src') === 'images/bookmark-plus.png') {
    $bookmarkIcon.setAttribute('src', 'images/bookmark-fill.png');
    data.entries.push(xhr.response);
    data.entryId++;
  } else {
    $bookmarkIcon.setAttribute('src', 'images/bookmark-plus.png');
    data.entries.pop();
  }

}
