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
