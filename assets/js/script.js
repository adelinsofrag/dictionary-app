// TODO: split into multiple JS files

/**
 * @function formatResponse
 *
 * @description receives an param (the fetch array response) and compose an object with only needed details
 *
 * @param {*} data
 * @returns an object
 */
function formatResponse(data = []) {
  // TODO: handle scenario when the response doesn't come as expected.
  return {
    inputWord: data[0].word || "", // the users input
    meanings: data[0].meanings || "", // what it means
    phonetic: data[0].phonetic || "", // phonetic (string)
    phoneticsAudio: data[0].phonetics || "", // phonetics (array of audio sources)
    sourceUrls: data[0].sourceUrls || "", // source of details
  };
}

function drawMarkUp(data) {
  console.info(data);

  document.getElementById("inputWord").innerText = data.inputWord;
  document.getElementById("phonetic").innerText = data.phonetic;
  document.getElementById(
    "sourceUrls"
  ).innerHTML = `<a href="${data.sourceUrls}">${data.sourceUrls}</a>`;

  return;
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

  const responseMsgError = document.getElementById("responseMsgError");

  // TODO: clear messages

  // User input
  let language = "en";
  let searchItem = e.target[0].value;

  if (!searchItem) {
    responseMsgError.innerText = "Error";
    responseMsgError.classList.toggle("d-none");
  } else {
    // Prepare API URL with users input
    const API_SOURCE = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${searchItem}`;
    fetch(API_SOURCE)
      .then((response) => response.json())
      .then((responseText) => formatResponse(responseText))
      .then((formattedResponse) => drawMarkUp(formattedResponse))
      .then(document.getElementById("responseMsgSuccess").classList.toggle("d-none"));
  }
}
