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
    inputWord: data[0]?.word || "", // the users input
    meanings: data[0]?.meanings || "", // what it means
    phonetic: data[0]?.phonetic || "", // phonetic (string)
    phoneticsAudio: data[0]?.phonetics || "", // phonetics (array of audio sources)
    sourceUrls: data[0]?.sourceUrls || "", // source of details
  };
}
/* ---------------------------------- */
/*       insert details in page       */
/* ---------------------------------- */
function drawMarkUp(data) {
  document.getElementById("inputWord").innerText = data.inputWord;
  document.getElementById("phonetic").innerText = data.phonetic;
  document.getElementById(
    "sourceUrls"
  ).innerHTML = `<a href="${data.sourceUrls}">${data.sourceUrls}</a>`;

  return;
}

// Helper fn
const showError = (message = "Error") => {
  console.error(message);

  const responseMsgError = document.getElementById("responseMsgError");
  responseMsgError.innerText = message;

  if (responseMsgError.classList.contains("d-none")) responseMsgError.classList.remove("d-none");
};

// Helper fn
const clearMessages = () => {
  const responseMsgError = document.getElementById("responseMsgError");
  const responseMsgSuccess = document.getElementById("responseMsgSuccess");

  if (!responseMsgError.classList.contains("d-none")) responseMsgError.classList.add("d-none");
  if (!responseMsgSuccess.classList.contains("d-none")) responseMsgSuccess.classList.add("d-none");
};
/* ---------------------------------- */
/*         handle submit event        */
/* ---------------------------------- */
const submitSearchForm = document.getElementById("submitSearchForm");
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (e) => handleSearchFormSubmit(e));

function handleSearchFormSubmit(e) {
  e.preventDefault();

  clearMessages();
  doFetchData((searchItem = e.target[0].value), (language = "en"));
}

// util fn
const doFetchData = (searchItem, language) => {
  if (!searchItem) {
    showError();
  } else {
    const API_SOURCE = `https://api.dictionaryapi.dev/api/v2/entries/${language}/${searchItem}`;
    fetch(API_SOURCE)
      .then((response) => response.json())
      .then((response) => handleResponse(response))
      .catch((error) => showError("Server Error"));
  }
};
/* ---------------------------------- */
/*        handle fetch response       */
/* ---------------------------------- */
function handleResponse(data) {
  if (data.title) return showError(data.message);

  document.getElementById("responseMsgSuccess").classList.toggle("d-none");
  drawMarkUp(formatResponse(data));
}
