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
var $footer = document.querySelector('footer');
var $header = document.querySelector('header');
var $stars = document.querySelector('.stars');
var $starIcons = document.querySelectorAll('.star-icons');
var $save = document.querySelector('.save');
var $textArea = document.querySelector('textarea');
var $modalJudge = document.querySelector('.judge');

$getStarted.addEventListener('click', openApp);
$random.addEventListener('click', random);
$learnMore.addEventListener('click', modal);
$exit.addEventListener('click', exitModal);
$bookmarkButton.addEventListener('click', bookmark);
$ul.addEventListener('click', listModal);
$footer.addEventListener('click', switchViews);
$header.addEventListener('click', switchViews);
$stars.addEventListener('click', newStars);
$save.addEventListener('click', submit);
$ul.addEventListener('click', edit);

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
  for (var i = 0; i < $starIcons.length; i++) {
    $starIcons[i].setAttribute('src', 'images/star-empty.png');
  }
  $textArea.value = null;
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
    $modalJudge.setAttribute('class', 'modal judge');
  } else {
    $bookmarkIcon.setAttribute('src', 'images/bookmark-plus.png');
    data.entries.pop();
    $ul.removeChild($ul.lastElementChild);
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
  img.setAttribute('class', 'dog column-half margin-right-bottom-desktop');
  img.setAttribute('src', entry[0].url);
  li.appendChild(img);

  var div = document.createElement('div');
  div.setAttribute('class', 'column-half');
  var p = document.createElement('p');
  div.appendChild(p);
  if (entry[0].breeds[0]) {
    p.textContent = entry[0].breeds[0].name;
    var p2 = document.createElement('p');
    p2.setAttribute('class', 'sixteen-font inline breed-info margin-none underline text-align-right-mobile width');
    p2.textContent = 'Click here to learn more!';
    p2.setAttribute('id', entry[0].id);
  } else {
    p.textContent = 'Unknown';
  }
  p.setAttribute('class', 'sixteen-font inline text-align-right-mobile margin-bottom-none margin-top-none');
  div.appendChild(p);

  li.appendChild(div);
  if (p2) {
    div.appendChild(p2);
  }
  var starsRow = document.createElement('div');
  starsRow.setAttribute('class', 'row margin-top');
  var stars = document.createElement('div');
  stars.setAttribute('class', 'stars row all-column-half');
  var starIcon = document.createElement('img');
  starIcon.setAttribute('class', 'star-icon-filled');
  starIcon.setAttribute('src', 'images/star-fill.png');
  for (var i = 0; i < entry[0].rating; i++) {
    stars.appendChild(starIcon.cloneNode(true));
  }
  div.appendChild(starsRow);
  starsRow.appendChild(stars);
  var pencil = document.createElement('img');
  pencil.setAttribute('class', 'pencil-square');
  pencil.setAttribute('id-key', entry[0].id);
  pencil.setAttribute('src', 'images/pencil-square.png');
  var pencilDiv = document.createElement('div');
  pencilDiv.setAttribute('class', 'row all-column-half justify-end');
  starsRow.appendChild(pencilDiv);
  pencilDiv.appendChild(pencil);
  var comments = document.createElement('p');
  comments.setAttribute('class', 'sixteen-font margin-top-none text-align-left');
  comments.textContent = entry[0].comment;
  div.appendChild(comments);

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

function switchViews(event) {
  if (event.target === $homeButton || event.target === $homeButtonHeader) {
    $homePage.setAttribute('class', 'home-page');
    $viewPage.setAttribute('class', 'view-page hidden');
    $savedButtonHeader.setAttribute('src', 'images/bookmark-black.png');
    $homeButtonHeader.setAttribute('src', 'images/house-door.png');
    $savedButton.setAttribute('src', 'images/bookmark-black.png');
    $homeButton.setAttribute('src', 'images/house-door.png');
  } else if (event.target === $savedButton || event.target === $savedButtonHeader) {
    $homePage.setAttribute('class', 'home-page hidden');
    $viewPage.setAttribute('class', 'view-page');
    $savedButtonHeader.setAttribute('src', 'images/bookmark-pink.png');
    $homeButtonHeader.setAttribute('src', 'images/house-black.png');
    $savedButton.setAttribute('src', 'images/bookmark-pink.png');
    $homeButton.setAttribute('src', 'images/house-black.png');
  }
}

var numOfStars = null;

function newStars(event) {
  numOfStars = null;
  fillStars(numOfStars);
}

function fillStars(number) {
  numOfStars = number;
  for (var i = 0; i < $starIcons.length; i++) {
    $starIcons[i].setAttribute('src', 'images/star-empty.png');
    if (event.target === $starIcons[i]) {
      numOfStars = parseInt($starIcons[i].getAttribute('value'));
    }
  }
  for (var e = 0; e < numOfStars; e++) {
    $starIcons[e].setAttribute('src', 'images/star-fill.png');
  }
}

function submit(event) {
  if (numOfStars !== null) {
    data.entries[data.entries.length - 1][0].rating = numOfStars;
  }
  if ($textArea.value !== undefined) {
    data.entries[data.entries.length - 1][0].comment = $textArea.value;
  }
  $ul.appendChild(dogListView(data.entries[data.entries.length - 1]));

  $modalJudge.setAttribute('class', 'modal judge hidden');
}

function edit(event) {
  if (event.target.matches('.pencil-square')) {
    $modalJudge.setAttribute('class', 'modal judge');
    for (var i = 0; i < data.entries.length; i++) {
      if (event.target.getAttribute('id-key') === data.entries[i][0].id) {
        fillStars(data.entries[i][0].rating);
        if (data.entries[i][0].comments === undefined) {
          $textArea.value = '';
        } else {
          $textArea.value = data.entries[i][0].comments;
        }
      }
    }
  }
}
