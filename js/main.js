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
var $ul = document.querySelector('ul');
var $homeButton = document.querySelector('.home-button');
var $savedButton = document.querySelector('.saved-button');
var $homePage = document.querySelector('.home-page');
var $viewPage = document.querySelector('.view-page');
var $homeButtonHeader = document.querySelector('.home-button-header');
var $savedButtonHeader = document.querySelector('.saved-button-header');

$getStarted.addEventListener('click', openApp);
$random.addEventListener('click', random);
$learnMore.addEventListener('click', modal);
$exit.addEventListener('click', exitModal);
$bookmarkButton.addEventListener('click', bookmark);
$ul.addEventListener('click', listModal);
$homeButton.addEventListener('click', showHome);
$savedButton.addEventListener('click', showSaved);
$homeButtonHeader.addEventListener('click', showHome);
$savedButtonHeader.addEventListener('click', showSaved);

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
  } else {
    $bookmarkIcon.setAttribute('src', 'images/bookmark-plus.png');
    data.entries.pop();
  }

}

window.addEventListener('DOMContentLoaded', dogList);

function dogList(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(dogListView(data.entries[i]));
  }
}

function dogListView(entry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row justify-end');

  var img = document.createElement('img');
  img.setAttribute('class', 'dog column-half');
  img.setAttribute('src', entry[0].url);
  li.appendChild(img);

  var p = document.createElement('p');
  if (entry[0].breeds[0]) {
    p.textContent = entry[0].breeds[0].name;
    var p2 = document.createElement('p');
    p2.setAttribute('class', 'breed-info margin-none underline margin-bottom');
    p2.textContent = 'Click here to learn more!';
    p2.setAttribute('id', entry[0].id);
  } else {
    p.textContent = 'Unknown';
  }
  p.setAttribute('class', 'text-align-right column-half margin-bottom-none margin-top-none');
  li.appendChild(p);
  if (p2) {
    li.appendChild(p2);
  }
  return li;
}

var iD = null;

function listModal(event) {
  if (event.target.matches('.breed-info')) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i][0].id === event.target.getAttribute('id')) {
        iD = i;
      }
    }
    $breedName.textContent = data.entries[iD][0].breeds[0].name;
    $bredFor.textContent = data.entries[iD][0].breeds[0].bred_for;
    $breedHeight.textContent = data.entries[iD][0].breeds[0].height.imperial + ' inches';
    $breedWeight.textContent = data.entries[iD][0].breeds[0].weight.imperial + ' lb';
    $breedTemper.textContent = data.entries[iD][0].breeds[0].temperament;
    $modal.setAttribute('class', 'modal');
  }
}

function showHome(event) {
  if ($homeButtonHeader.getAttribute('class') === event.target.getAttribute('class')) {
    $homePage.setAttribute('class', 'home-page');
    $viewPage.setAttribute('class', 'view-page hidden');
    $savedButtonHeader.setAttribute('src', 'images/bookmark-black.png');
    $homeButtonHeader.setAttribute('src', 'images/house-door.png');
  } else {
    $homePage.setAttribute('class', 'home-page');
    $viewPage.setAttribute('class', 'view-page hidden');
    $savedButton.setAttribute('src', 'images/bookmark-black.png');
    $homeButton.setAttribute('src', 'images/house-door.png');
  }
}

function showSaved(event) {
  if ($savedButtonHeader.getAttribute('class') === event.target.getAttribute('class')) {
    $homePage.setAttribute('class', 'home-page hidden');
    $viewPage.setAttribute('class', 'view-page');
    $savedButtonHeader.setAttribute('src', 'images/bookmark-pink.png');
    $homeButtonHeader.setAttribute('src', 'images/house-black.png');
  } else {
    $homePage.setAttribute('class', 'home-page hidden');
    $viewPage.setAttribute('class', 'view-page');
    $savedButton.setAttribute('src', 'images/bookmark-pink.png');
    $homeButton.setAttribute('src', 'images/house-black.png');
  }
}
