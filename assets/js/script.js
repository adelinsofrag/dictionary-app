let source = "https://api.dictionaryapi.dev/api/v2/entries/en/hello";
fetch(source)
  .then((x) => x.text())
  .then((y) => (document.getElementById("demo").innerHTML = y));
