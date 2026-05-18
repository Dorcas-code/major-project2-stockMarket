// grab the form - start from chrome dev tools to do this
const todoForm = document.querySelector("#todo-form");

const searchButton = document.querySelector(".add-btn");
const searchResult = document.querySelector("#search-result");
const todoInput = document.querySelector("#todo-input");
const useFakeData = true;

async function getRecipes() {
  if (!useFakeData) {
    // fetch code
    // url - https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2
    // put the fetch
    // put in the response handling here
  } else {
    // put this into a json file and fetch from the json file like we would with the url

    // or do something like this
    const fakeData = [
      {
        id: 640352,
        title: "Cranberry Apple Crisp",
        image: "https://img.spoonacular.com/recipes/640352-312x231.jpg",
        imageType: "jpg",
        usedIngredientCount: 1,
        missedIngredientCount: 3,
        missedIngredients: [
          {
            id: 9078,
            amount: 2.0,
            unit: "cups",
            unitLong: "cups",
            unitShort: "cup",
            aisle: "Produce",
            name: "cranberries",
            original: "2 cups fresh cranberries",
            originalName: "fresh cranberries",
            meta: ["fresh"],
            extendedName: "fresh cranberries",
            image:
              "https://img.spoonacular.com/ingredients_100x100/cranberries.jpg",
          },
          {
            id: 1145,
            amount: 4.0,
            unit: "Tbs",
            unitLong: "Tbs",
            unitShort: "Tbsp",
            aisle: "Milk, Eggs, Other Dairy",
            name: "butter",
            original: "1/2 stick (4 Tbs) unsalted butter, cut into cubes",
            originalName: "1/2 stick unsalted butter, cut into cubes",
            meta: ["unsalted", "cut into cubes"],
            extendedName: "unsalted butter",
            image:
              "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg",
          },
          {
            id: 8120,
            amount: 1.5,
            unit: "cups",
            unitLong: "cups",
            unitShort: "cup",
            aisle: "Cereal",
            name: "regular oats",
            original: "1 1/2 cups regular oats (not quick-cooking)",
            originalName: "regular oats (not quick-cooking)",
            meta: ["(not quick-cooking)"],
            image:
              "https://img.spoonacular.com/ingredients_100x100/rolled-oats.jpg",
          },
        ],
        usedIngredients: [
          {
            id: 1089003,
            amount: 4.0,
            unit: "cups",
            unitLong: "cups",
            unitShort: "cup",
            aisle: "Produce",
            name: "granny smith apples",
            original: "4 cups Granny Smith apples, chopped into ½ inch chunks",
            originalName: "Granny Smith apples, chopped into ½ inch chunks",
            meta: ["chopped"],
            image:
              "https://img.spoonacular.com/ingredients_100x100/grannysmith-apple.png",
          },
        ],
        unusedIngredients: [],
        likes: 11,
      },
      {
        id: 641803,
        title: "Easy & Delish! ~ Apple Crumble",
        image: "https://img.spoonacular.com/recipes/641803-312x231.jpg",
        imageType: "jpg",
        usedIngredientCount: 1,
        missedIngredientCount: 3,
        missedIngredients: [
          {
            id: 1001,
            amount: 0.75,
            unit: "stick",
            unitLong: "sticks",
            unitShort: "stick",
            aisle: "Milk, Eggs, Other Dairy",
            name: "butter",
            original: "3/4 stick of butter",
            originalName: "butter",
            meta: [],
            image:
              "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg",
          },
          {
            id: 2011,
            amount: 1.0,
            unit: "Dash",
            unitLong: "Dash",
            unitShort: "Dash",
            aisle: "Spices and Seasonings",
            name: "ground cloves",
            original: "Dash of ground cloves",
            originalName: "ground cloves",
            meta: [],
            image: "https://img.spoonacular.com/ingredients_100x100/cloves.jpg",
          },
          {
            id: 9156,
            amount: 1.0,
            unit: "",
            unitLong: "",
            unitShort: "",
            aisle: "Produce",
            name: "lemon zest",
            original: "1 Zest of lemon",
            originalName: "Zest of lemon",
            meta: [],
            image:
              "https://img.spoonacular.com/ingredients_100x100/zest-lemon.jpg",
          },
        ],
        usedIngredients: [
          {
            id: 9003,
            amount: 3.0,
            unit: "",
            unitLong: "",
            unitShort: "",
            aisle: "Produce",
            name: "apples",
            original: "3 apples – sliced",
            originalName: "apples – sliced",
            meta: ["sliced"],
            image: "https://img.spoonacular.com/ingredients_100x100/apple.jpg",
          },
        ],
        unusedIngredients: [],
        likes: 1,
      },
    ];
    const myPromise = Promise.resolve(fakeData);

    // Await the promise to get the string value
    const myString = await myPromise;

    return myString;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Form submission and eventhandling
  searchResult.classList.add("hidden");

  todoForm.addEventListener("submit", handleFormSubmit);
});
// add event listener to the form
async function handleFormSubmit(event) {
  event.preventDefault();
  const stockId = todoInput.value;

  const listItem = document.createElement("div");
  searchResult.classList.remove("hidden");
  searchResult.classList.add("visible");

  searchResult.appendChild(listItem);
  const datas = await getRecipes();

  for (let i = 0; i < datas.length; i++) {
    if (stockId == datas[i].id) {
      listItem.textContent = datas[i].id;
    } else {
      console.log("They do not match.");
    }
  }
}
