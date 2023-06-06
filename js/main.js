const $getStarted = document.querySelector('.get-started');
let breed = null;
const $random = document.querySelector('.random');
const $learnMore = document.querySelector('.breed-info');
const $breedName = document.querySelector('.breed-name');
const $bredFor = document.querySelector('.bred-for');
const $breedHeight = document.querySelector('.breed-height');
const $breedWeight = document.querySelector('.breed-weight');
const $breedTemper = document.querySelector('.breed-temperament');
const $modal = document.querySelector('.modal');
const $exit = document.querySelector('.exit');
const $bookmarkButton = document.querySelector('.bookmark-button');
const $bookmarkIcon = document.querySelector('.bookmark-icon');
const $ul = document.querySelector('ul');
const $footer = document.querySelector('footer');
const $header = document.querySelector('header');
const $stars = document.querySelector('.stars');
const $starIcons = document.querySelectorAll('.star-icons');
const $save = document.querySelector('.save');
const $textArea = document.querySelector('textarea');
const $modalJudge = document.querySelector('.judge');
const $spinner = document.querySelector('.spinner');

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

let xhr = null;

function openApp(event) {
  const $body = document.querySelector('body');
  const $openingScreen = document.querySelector('.opening-screen');
  const $homeScreen = document.querySelector('.home-screen');
  $body.setAttribute('class', 'background-color-gray');
  xhr = getDogPic();
  $openingScreen.setAttribute('class', 'opening-screen row container hidden');
  $homeScreen.setAttribute('class', 'home-screen');
}

function getDogPic() {
  const xhr = new XMLHttpRequest();
  xhr['x-api-key'] = 'live_AbxZ9Uhoc6k85PJlYXd6WnSETLyqs1ryu8w2ovMxTPk5DSebTnMnS7tT9c2Aa1Ov';
  xhr.open('GET', 'https://api.thedogapi.com/v1/images/search');
  xhr.responseType = 'json';
  xhr.addEventListener('loadstart', spinner);
  xhr.addEventListener('load', breedInfo);
  xhr.send();
  return xhr;
}

function spinner(event) {
  $spinner.setAttribute('class', 'spinner');
}

function breedInfo(event) {
  const $dog = document.querySelector('.dog');
  const $dogBreedText = document.querySelector('.dog-breed-text');
  $spinner.setAttribute('class', 'spinner hidden');
  if (xhr.response[0].breeds) {
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
  $dogBreedText.textContent = 'Breed: ' + breed;
  $dog.setAttribute('src', xhr.response[0].url);
}

function random(event) {
  xhr = getDogPic();
  $bookmarkIcon.setAttribute('src', 'images/bookmark-plus.png');
  for (let i = 0; i < $starIcons.length; i++) {
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
  if (data.entries.length === 0) {
    const div = document.createElement('div');
    div.setAttribute('class', 'justify-center margin-top');
    const p = document.createElement('p');
    p.setAttribute('class', 'header');
    p.textContent = 'No dogs saved!';
    div.appendChild(p);
    $ul.appendChild(div);
  } else {
    for (let i = 0; i < data.entries.length; i++) {
      $ul.appendChild(dogListView(data.entries[i]));
    }
  }
}

function dogListView(entry) {
  const li = document.createElement('li');
  li.setAttribute('class', 'row justify-center nowrap');
  li.setAttribute('liId', entry[0].id);

  const img = document.createElement('img');
  img.setAttribute('class', 'dog column-half margin-right-bottom-desktop');
  img.setAttribute('src', entry[0].url);
  li.appendChild(img);

  const div = document.createElement('div');
  div.setAttribute('class', 'column-half margin-left width-350-mobile');
  const p = document.createElement('p');
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
  const starsRow = document.createElement('div');
  starsRow.setAttribute('class', 'row margin-top');
  const stars = document.createElement('div');
  stars.setAttribute('class', 'stars row all-column-half');
  const starIcon = document.createElement('img');
  starIcon.setAttribute('class', 'star-icon-filled');
  starIcon.setAttribute('src', 'images/star-fill.png');
  for (let i = 0; i < entry[0].rating; i++) {
    stars.appendChild(starIcon.cloneNode(true));
  }
  div.appendChild(starsRow);
  starsRow.appendChild(stars);
  const pencil = document.createElement('img');
  pencil.setAttribute('class', 'pencil-square');
  pencil.setAttribute('id-key', entry[0].id);
  pencil.setAttribute('src', 'images/pencil-square.png');
  const pencilDiv = document.createElement('div');
  pencilDiv.setAttribute('class', 'row all-column-half justify-end');
  starsRow.appendChild(pencilDiv);
  pencilDiv.appendChild(pencil);
  const comments = document.createElement('p');
  comments.setAttribute('class', 'sixteen-font margin-top-none text-align-left');
  comments.textContent = entry[0].comment;
  div.appendChild(comments);
  return li;
}

let iD = null;

function listModal(event) {
  if (event.target.matches('.breed-info')) {
    for (let i = 0; i < data.entries.length; i++) {
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
  const $homePage = document.querySelector('.home-page');
  const $viewPage = document.querySelector('.view-page');
  const $homeButton = document.querySelector('.home-button');
  const $savedButton = document.querySelector('.saved-button');
  const $homeButtonHeader = document.querySelector('.home-button-header');
  const $savedButtonHeader = document.querySelector('.saved-button-header');
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

let numOfStars = null;

function newStars(event) {
  numOfStars = null;
  fillStars(numOfStars);
}

function fillStars(number) {
  numOfStars = number;
  for (let i = 0; i < $starIcons.length; i++) {
    $starIcons[i].setAttribute('src', 'images/star-empty.png');
    if (event.target === $starIcons[i]) {
      numOfStars = parseInt($starIcons[i].getAttribute('value'));
    }
  }
  for (let e = 0; e < numOfStars; e++) {
    $starIcons[e].setAttribute('src', 'images/star-fill.png');
  }
}

function submit(event) {
  event.preventDefault();
  if (data.editing === null) {
    if (numOfStars !== null) {
      data.entries[data.entries.length - 1][0].rating = numOfStars;
    }
    if ($textArea.value !== undefined) {
      data.entries[data.entries.length - 1][0].comment = $textArea.value;
    }
    $ul.appendChild(dogListView(data.entries[data.entries.length - 1]));

  } else {
    const objectEdit = [{ id: data.editing[0].id, rating: numOfStars, comment: $textArea.value }];
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i][0].id === objectEdit[0].id) {
        data.entries[i][0].rating = objectEdit[0].rating;
        data.entries[i][0].comment = objectEdit[0].comment;
        var editedEntry = dogListView(data.entries[i]);
        var numId = i;
      }
    }
    const $liItems = document.querySelectorAll('li');
    for (let e = 0; e < $liItems.length; e++) {
      if ($liItems[e].getAttribute('liId') === data.entries[numId][0].id) {
        $ul.replaceChild(editedEntry, $liItems[e]);
      }
    }
    data.editing = null;
  }
  $modalJudge.setAttribute('class', 'modal judge hidden');
}

function edit(event) {
  if (event.target.matches('.pencil-square')) {
    $modalJudge.setAttribute('class', 'modal judge');
    for (let i = 0; i < data.entries.length; i++) {
      if (event.target.getAttribute('id-key') === data.entries[i][0].id) {
        data.editing = data.entries[i];
        fillStars(data.entries[i][0].rating);
        if (data.entries[i][0].comment === undefined) {
          $textArea.value = '';
        } else {
          $textArea.value = data.entries[i][0].comment;
        }
      }
    }
  }
}
