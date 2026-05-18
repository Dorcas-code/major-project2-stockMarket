// grab the form - start from chrome dev tools to do this
const todoForm = document.querySelector("#todo-form");

const searchButton = document.querySelector(".add-btn");
const searchResult = document.querySelector("#search-result");
const todoInput = document.querySelector("#todo-input");
document.addEventListener("DOMContentLoaded", function () {
  // Form submission and eventhandling
  searchResult.classList.add("hidden");
  todoForm.addEventListener("submit", handleFormSubmit);
});
// add event listener to the form
function handleFormSubmit(event) {
  event.preventDefault();
  const listItem = document.createElement("div");
  searchResult.classList.remove("hidden");
  searchResult.classList.add("visible");
  listItem.textContent = todoInput.value;

  searchResult.appendChild(listItem);
}
