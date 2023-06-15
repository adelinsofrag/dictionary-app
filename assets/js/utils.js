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