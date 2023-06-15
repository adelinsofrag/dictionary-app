// TODO: split into multiple JS files
/* ---------------------------------- */
/*       insert details in page       */
/* ---------------------------------- */
function drawMarkUp(data) {
  const responseContentContainer = document.getElementById("responseContent");
  let html = "";

  data.map((el) => {
    html += `      
    <div class="card mt-5">
      <h5 class="card-header" id="inputWord">${el.word}</h5>
      <hr>
      <div class="card-body">        
        ${drawMeanings(el.meanings)}
        <hr>
        ${drawPhonetics(el.phonetics)}
        <hr>
        <a target="_blank" href="${el.license.url}" class="btn btn-outline-info">
          ${el.license.name}
        </a>
        <hr>
        ${drawSourceURLs(el.sourceUrls)}
      </div>
    </div>
  `;
  });
  responseContentContainer.innerHTML = html;
  return;
}

const drawDefinitions = (items) => {
  let defHTML = "";
  items.forEach((item) => (defHTML += `<p class="font-monospace">${item.definition}</p>`));

  return defHTML;
};

const drawAList = (list) => {
  let listHTML = `<div class="row row-cols-auto">`;
  list.forEach((s) => (listHTML += `<span class="col rounded-pill text-bg-light">${s}</span>`));
  listHTML += "</div>";

  return listHTML;
};
const drawMeanings = (el) => {
  let html = "";
  el.forEach(
    (row) =>
      (html += `
      <p class="w-25 rounded-pill text-bg-light text-center font-monospace">${row.partOfSpeech}</p>
      <hr>
      <div class="d-flex flex-column">
        ${
          row.synonyms.length > 0
            ? "<div class='flex-row'><p class='text-uppercase lead'>Synonyms</p>" +
              drawAList(row.synonyms) +
              "</div>"
            : ""
        }
        <hr>
        ${
          row.antonyms.length > 0
            ? "<div class='flex-row'><p class='text-uppercase lead'>Antonyms</p>" +
              drawAList(row.antonyms) +
              "</div>"
            : ""
        }
      </div>
      <hr>
      <p class="text-uppercase lead">Definitions</p>
      <hr>
      ${row.definitions.length > 0 ? drawDefinitions(row.definitions) : ""}
  `)
  );
  return html;
};

const drawPhonetics = (el) => {
  let html = "";

  el.forEach(
    (row) =>
      (html += `
      <div class="my-2 d-flex justify-content-between">
        <a target="_blank" href="${row.sourceUrl}" class="btn btn-outline-info">
        <span class="material-symbols-outlined">
        record_voice_over
        </span>
        ${row.text}
        </a>
        <audio controls>
          <source src="${row.audio}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
    `)
  );

  return html;
};

const drawSourceURLs = (el) => {
  let html = "";
  el.forEach(
    (item) => (html += `<a target="_blank" href="${item}" class="btn btn-outline-info">${item}</a>`)
  );

  return html;
};

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
  drawMarkUp(data);
}
