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
/* ---------------------------------- */
/*        handle fetch response       */
/* ---------------------------------- */
function handleResponse(data) {
  if (data.title) return showError(data.message);

  document.getElementById("responseMsgSuccess").classList.toggle("d-none");
  drawMarkUp(data);
}
