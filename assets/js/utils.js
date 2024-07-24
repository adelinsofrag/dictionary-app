const API_SOURCE_BASE_URL = `https://api.dictionaryapi.dev/api/v2`;

const doFetchData = (searchItem, language) => {
  if (!searchItem) {
    showError();
  } else {
    const API_SOURCE = `${API_SOURCE_BASE_URL}/entries/${language}/${searchItem}`;
    fetch(API_SOURCE)
      .then((response) => response.json())
      .then((response) => handleResponse(response))
      .catch((error) => showError("Server Error", error));
  }
};

const doSearch = (word) => {
  doFetchData(word, "en");

  document.querySelector("#searchInputWord").value = word;
};

function initialize() {
  const urlParams = new URL(window.location.toString()).searchParams;

  const existingWordValue = urlParams.get("word");

  if (!!existingWordValue) {
    doSearch(existingWordValue);
  }
}

setTimeout(initialize, 1500);
