const LOCAL_STORAGE_KEY = "mywords";
let emptyWordsList = [];

function getDataFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getWordsFromLocalStorage() {
  return getDataFromLocalStorage(LOCAL_STORAGE_KEY) || emptyWordsList;
}

function addWordToLocalStorage(word) {
  let currentListOfWords = getWordsFromLocalStorage();
  currentListOfWords.push(word);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentListOfWords));

  return drawMyListOfWords();
}