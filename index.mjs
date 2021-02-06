import { CATEGORIES } from "./categories.mjs";

let playersCount = 6;
let spiesCount = 1;
let durationInMinutes = 10;
let category = CATEGORIES.places;

function setPlayersCount(count) {
  playersCount = count;
}

function setSpiesCount(count) {
  spiesCount = count;
}

function setDurationInMinutes(duration) {
  durationInMinutes = duration;
}

function setCategory(category) {
  category = category;
}

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

window.onload = function () {
  updatePlayersCountDom();
  updateSpiesCountDom();
  updateDurationDom();
  updateCategoryDom();
};
