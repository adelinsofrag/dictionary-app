const showError = (message = "Error") => {
  console.error(message);

  const responseMsgError = document.getElementById("responseMsgError");
  responseMsgError.innerText = message;

  if (responseMsgError.classList.contains("d-none")) responseMsgError.classList.remove("d-none");
};

const clearMessages = () => {
  const responseMsgError = document.getElementById("responseMsgError");
  const responseMsgSuccess = document.getElementById("responseMsgSuccess");

  if (!responseMsgError.classList.contains("d-none")) responseMsgError.classList.add("d-none");
  if (!responseMsgSuccess.classList.contains("d-none")) responseMsgSuccess.classList.add("d-none");
};
