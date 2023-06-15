// TODO: split into multiple JS files

// User input
let language = "en";
let searchItem = "morning";

// Prepare API URL with users input
const API_SOURCE = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${searchItem}`;

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

  return document.getElementById("demo").innerHTML = data;
}

// Fetch data
fetch(API_SOURCE)
  .then((response) => response.json())
  .then((responseText) => formatResponse(responseText))
  .then((formattedResponse) => drawMarkUp(formattedResponse));
