import { CATEGORIES } from "./categories.mjs";
import { PAGES } from "./pages.mjs";

let playersCount = 6;
let spiesCount = 1;
let durationInMinutes = 10;
let category = CATEGORIES.places;

function updatePlayersCountDom() {
  document.querySelector(
    "#players-button"
  ).children[1].innerText = playersCount;
}

function updateSpiesCountDom() {
  document.querySelector("#spies-button").children[1].innerText = spiesCount;
}

function updateDurationDom() {
  document.querySelector(
    "#duration-button"
  ).children[1].innerText = durationInMinutes;
}

function updateCategoryDom() {
  document.querySelector("#category-button").children[1].innerText =
    category.name;
}

function setPlayersCount(count) {
  playersCount = count;
  updatePlayersCountDom();
}

function setSpiesCount(count) {
  spiesCount = count;
  updateSpiesCountDom();
}

function setDurationInMinutes(duration) {
  durationInMinutes = duration;
  updateDurationDom();
}

function setCategory(category) {
  category = category;
  updateCategoryDom();
}

function populateCountPikcerDom(page, callback) {
  for (let i = 0; i < 21; i++) {
    const button = document.createElement("button");
    button.innerText = i + 1;
    button.onclick = function () {
      callback(i + 1);
      showPage("start-page");
    };
    document.querySelector("." + page).appendChild(button);
  }
}

function showPage(pageClass) {
  document.querySelector("." + PAGES.startPage).style.display = "none";
  document.querySelector("." + PAGES.setPlayers).style.display = "none";
  document.querySelector("." + PAGES.setSpies).style.display = "none";
  document.querySelector("." + PAGES.setDuration).style.display = "none";
  document.querySelector("." + PAGES.setCategory).style.display = "none";

  document.querySelector("." + pageClass).style.display = "flex";
}

window.onload = function () {
  updatePlayersCountDom();
  updateSpiesCountDom();
  updateDurationDom();
  updateCategoryDom();

  showPage(PAGES.startPage);

  populateCountPikcerDom(PAGES.setPlayers, setPlayersCount);
  populateCountPikcerDom(PAGES.setSpies, setSpiesCount);
  populateCountPikcerDom(PAGES.setDuration, setDurationInMinutes);
};

window.showPage = showPage;
