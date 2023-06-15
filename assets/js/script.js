// TODO: split into multiple JS files

/**
 * @function formatResponse
 *
 * @description receives an param (the fetch array response) and compose an object with only needed details
 *
 * @param {*} data
 * @returns an object
 */
function formatResponse(data) {
  return (output = {
    inputWord: data[0].word, // the users input
    meanings: data[0].meanings, // what it means
    phonetic: data[0].phonetic, // phonetic (string)
    phoneticsAudio: data[0].phonetics, // phonetics (array of audio sources)
    sourceUrls: data[0].sourceUrls, // source of details
  });
}

function drawMarkUp(data) {
  console.table(data);

  return (document.getElementById("demo").innerHTML = data.inputWord);
}

/* ---------------------------------- */
/*         handle submit event        */
/* ---------------------------------- */
const submitSearchForm = document.getElementById("submitSearchForm");
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (e) => handleSearchFormSubmit(e));

function handleSearchFormSubmit(e) {
  e.preventDefault();
  console.log("Submitted with value:", e.target[0].value);

  // User input
  let language = "en";
  let searchItem = e.target[0].value;

  // Prepare API URL with users input
  const API_SOURCE = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${searchItem}`;

  return fetch(API_SOURCE)
    .then((response) => response.json())
    .then((responseText) => formatResponse(responseText))
    .then((formattedResponse) => drawMarkUp(formattedResponse));
}
