function drawMarkUp(data) {
  const responseContentContainer = document.getElementById("responseContent");
  let html = "";

  data.map((el) => {
    html += `
      <div class="card mt-5">
        <h5 class="card-header d-flex justify-content-between" id="inputWord">${
          el.word
        } <span class="cursor badge bg-success bg-opacity-50" role="button"
                onClick="addWordToLocalStorage('${el.word}')">+ Add to words list</span>
        </h5>
        
        <div class="card-body">        
          ${drawMeanings(el.meanings)}
          
          ${drawPhonetics(el.phonetics)}
          
          <a target="_blank" href="${el.license.url}" class="btn btn-outline-success">
            ${el.license.name}
          </a>
          
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
        <p class="w-25 rounded-pill text-bg-success text-center font-monospace">${
          row.partOfSpeech
        }</p>
        
        <div class="d-flex flex-column">
          ${
            row.synonyms.length > 0
              ? "<div class='flex-row my-3'><p class='text-uppercase lead text-underline'>Synonyms</p>" +
                drawAList(row.synonyms) +
                "</div>"
              : ""
          }
          
          ${
            row.antonyms.length > 0
              ? "<div class='flex-row my-3'><p class='text-uppercase lead text-underline'>Antonyms</p>" +
                drawAList(row.antonyms) +
                "</div>"
              : ""
          }
        </div>
        
        
        ${
          row.definitions.length > 0
            ? '<p class="text-uppercase lead text-underline">Definitions</p>' +
              drawDefinitions(row.definitions)
            : ""
        }
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
          <a target="_blank" href="${row.sourceUrl}" class="btn btn-outline-success">
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
    (item) =>
      (html += `<a target="_blank" href="${item}" class="btn btn-outline-success">${item}</a>`)
  );

  return html;
};

function drawMyListOfWords() {
  let html = "<ul class='list-group list-group-flush'>";
  let uniqueWords = [...new Set(getWordsFromLocalStorage())];

  uniqueWords.forEach((item) => {
    html += `<li class="list-group-item">${item}</li>`;
  });

  html += "</ul>";
  return (document.getElementById("wordsList").innerHTML = html);
}
