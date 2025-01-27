/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data

  for (let i = 0; i < games.length; i++) {
    const currentGame = games[i];
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");

    // add the class game-card to the list

    gameCard.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    gameCard.innerHTML = `
  <img src="${currentGame.img}" class="game-img" alt="${currentGame.name}" />
  <h3>${currentGame.name}</h3>
  <p>${currentGame.description}</p>
`;

    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.textContent = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalraisedCard = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.textContent = "$" + totalraisedCard;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.textContent = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
  console.log(unfundedGames);
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}
// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  console.log(fundedGames);
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames);
}
// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// add event listeners with the correct functions to each button
// Get reference to your buttons
const button1 = document.getElementById("unfunded-btn");
const button2 = document.getElementById("funded-btn");
const button3 = document.getElementById("all-btn");

// Add event listeners to the buttons
button1.addEventListener("click", filterUnfundedOnly);
button2.addEventListener("click", filterFundedOnly);
button3.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(
  (game) => game.pledged < game.goal
).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesMessage = `Our company is proud to present a diverse range of games. ${
  unfundedGamesCount > 0
    ? `Unfortunately, ${unfundedGamesCount} game${
        unfundedGamesCount > 1 ? "s are" : " is"
      } currently unfunded.`
    : "All our games are funded and ready to thrive."
}`;
// create a new DOM element containing the template string and append it to the description container
const companyInfoElement = document.createElement("div");
companyInfoElement.innerHTML = unfundedGamesMessage;

descriptionContainer.appendChild(companyInfoElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUpGame, ...restOfGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("div");
topGameElement.textContent = `${topGame.name}`;
firstGameContainer.appendChild(topGameElement);

// do the same for the runner up item
const runnerUpGameElement = document.createElement("div");
runnerUpGameElement.textContent = `${runnerUpGame.name}`;
secondGameContainer.appendChild(runnerUpGameElement);
