// grab the form - start from chrome dev tools to do this
const todoForm = document.querySelector("#todo-form");

const searchButton = document.querySelector(".add-btn");
const searchResult = document.querySelector("#search-result");
const todoInput = document.querySelector("#todo-input");
const portSummary = document.querySelector("#portSummary");
const addPortButton = document.querySelector(".addPort-btn");
const useFakeData = true;
const addPortInput = document.querySelector("#addPort-input");

async function getRecipes(valueID) {
  if (!useFakeData) {
    // fetch code
    // url - https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2
    // put the fetch
    // put in the response handling here
    const apiKey = "82c8aca5576140f4a12d5b9a41cdbbb7";
    const url =
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
      valueID +
      "&apikey=" +
      apiKey;
    console.log("URL:", url);
    try {
      // 1. Pause here until the fetch Promise resolves
      const response = await fetch(url);

      // 2. Pause here until the json() Promise resolves
      const userData = await response.json();

      return userData;
    } catch (error) {
      // 3. Catch any rejected Promises in the chain
      console.error("Error fetching data:", error);
    }
  } else {
    // return fake data
    const fakeData = {
      "Global Quote": {
        "01. symbol": "AAPL",
        "05. price": "150.00",
        "09. change": "+2.00",
        "10. change percent": "+1.35%",
      },
    };
    return fakeData;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Form submission and eventhandling
  searchResult.classList.add("hidden");

  todoForm.addEventListener("submit", handleFormSubmit);
  addPortButton.addEventListener("click", handlePortfolioSubmit);
});
// add event listener to the form
async function handleFormSubmit(event) {
  event.preventDefault();
  const stockId = todoInput.value;
  const listItem = document.createElement("div");
  const change = document.createElement("div");
  const addProfolio = document.createElement("div");
  const changePercentage = document.createElement("div");
  searchResult.classList.remove("hidden");
  searchResult.classList.add("visible");

  searchResult.appendChild(listItem);
  searchResult.appendChild(change);
  searchResult.appendChild(changePercentage);
  searchResult.appendChild(addProfolio);
  const datas = await getRecipes(stockId);
  const cardHTML = `
 
       <br><br>
       <div class="addPort-group">
              <h3 class="text-2xl/7 font-medium mb-2">
            <b>Portfolio Management </b>
          </h3>
             Number of shares hold:
             <br> 
              <form id="addPort-form" class="addPortForm">
              <input
                type="text"
                id="addPortInput"
                class="addPortInput"
                placeholder="Number of shares"
                required
                aria-label="Add to Portfolio item"
              />
              </form><br><br>
              <button type="submit" class="addPort-btn" for="addPort-input"   >Update</button>
      
      
    </div>
  `;
  if (stockId.toUpperCase() == datas["Global Quote"]["01. symbol"]) {
    const priceValue = datas["Global Quote"]["05. price"];
    const changeValue = datas["Global Quote"]["09. change"];
    const changePercentValue = datas["Global Quote"]["10. change percent"];
    listItem.textContent = "Price: $" + priceValue;
    if (Number(changeValue) >= 0) {
      change.classList.add("rise");
      change.classList.remove("drop");
      changePercentage.classList.add("rise");
      changePercentage.classList.remove("drop");
    } else {
      change.classList.add("drop");
      change.classList.remove("rise");
      changePercentage.classList.add("drop");
      changePercentage.classList.remove("rise");
    }

    change.textContent = "Change: $" + changeValue;
    changePercentage.textContent = "Change Percent:  " + changePercentValue;
    addProfolio.innerHTML += cardHTML;
  } else {
    change.textContent = "Sorry cannot find symbol: " + todoInput.value;
    change.classList.add("drop");
  }
}

// add event listener to portfolio form
function handlePortfolioSubmit(event) {
  event.preventDefault();
  const stockShares = addPortInput.querySelector("#addPort-input").value;
  console.log("Number of shares to update:", stockShares);
  portSummary.textContent = stockShares + " shares added to portfolio.";
}
