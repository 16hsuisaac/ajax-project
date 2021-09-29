/* exported data */
var data = {
  entries: [],
  editing: null
};

window.addEventListener('unload', beforeUnload);
function beforeUnload(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
}

const previousDataJSON = localStorage.getItem('data');
if (previousDataJSON !== null) {
  data = (JSON.parse(previousDataJSON));
}
