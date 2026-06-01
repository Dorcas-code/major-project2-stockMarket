// grab the form - start from chrome dev tools to do this
let stockportfolio = [];
let isClicked = false;
const todoForm = document.querySelector("#todo-form");

const searchButton = document.querySelector(".add-btn");
const searchResult = document.querySelector("#search-result");
const portfolioSummary = document.querySelector("#portSummary");
const todoInput = document.querySelector("#todo-input");
const portSummary = document.querySelector("#portSummary");
const addPortForm = document.querySelector("#addPort-form");
const addPortButton = document.querySelector(".addPort-btn");
const useFakeData = true;
const myportValue = document.querySelector(".myportValue");
const portSummaryValue = document.querySelector(".PortSummaryValue");
const myStocks = document.querySelector(".myStocks");
// Todo Management Functions
async function addStock(text) {
  const addStockdata = await getRecipes(text);
  const priceValue = addStockdata["Global Quote"]["05. price"];
  const changeValue = addStockdata["Global Quote"]["09. change"];
  const changePercentValue = addStockdata["Global Quote"]["10. change percent"];
  const newstock = {
    id: Date.now().toString(),

    name: text,
    priceValue: priceValue,
    changeValue: changeValue,
    changePercentValue: changePercentValue,
    createdAt: new Date().toISOString(),
  };

  stockportfolio.push(newstock);

  let data = localStorage.setItem(
    "stockportfolio",
    JSON.stringify(stockportfolio),
  );

  console.log("Added stock:", stockportfolio);
}
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
  loadStocksFromStorage();
  searchResult.classList.add("hidden");

  todoForm.addEventListener("submit", handleFormSubmit);
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
                class="addPortInput "
                placeholder="Number of shares"
                required
                aria-label="Add to Portfolio item"
              />
               <button  onclick="handlePortfolioSubmit(event)" type="submit" class="addPort-btn" for="addPortInput" >Update</button>
              </form><br><br>
             
      
      
    </div>
  `;

  const addPortInput = document.querySelector("#addPortInput");

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

  const stockShares = addPortInput.value;

  addStock(todoInput.value);

  const data = loadStocksFromStorage();
  console.log("Data loaded from storage:", data);
  let priceValues = 0;
  data.map((stock) => {
    if (stock.name === todoInput.value) {
      priceValues = stock.priceValue;
    }
  });

  const portHTML = `
 
       <br><br>
       <div class="PortSummaryHTML">
              
             Number of shares hold:
              <span class="PortSummaryValue">${stockShares}</span>
              <br> 
                     Your current stock value is: $<span class="PortSummaryValue">${priceValues * stockShares}</span>
         </div>
  `;
  portSummary.innerHTML += portHTML;

  myportValue.textContent = priceValues * stockShares;
  myStocks.textContent = stockShares;
}
function loadStocksFromStorage() {
  // Try to get the saved stocks from browser storage
  const storedStocks = localStorage.getItem("stockportfolio") || "[]"; // Default to an empty array if nothing is found
  // Only try to parse if we actually found saved data
  if (storedStocks) {
    // Convert the JSON string back into an array
    return (stockportfolio = JSON.parse(storedStocks));
  }
}
