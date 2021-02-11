import { Assigner } from "./Assigner.mjs";
import { CATEGORIES } from "./categories.mjs";
import { PAGES } from "./pages.mjs";

let playersCount = +localStorage.getItem("players") || 6;
let spiesCount = +localStorage.getItem("spies") || 1;
let durationInMinutes = +localStorage.getItem("duration") || 10;
let category = CATEGORIES.sports;

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
  localStorage.setItem("players", count);
  updatePlayersCountDom();
}

function setSpiesCount(count) {
  if (count >= playersCount / 2) {
    alert("Spies must be less than half of players.");
  } else {
    spiesCount = count;
  }
  localStorage.setItem("spies", count);
  updateSpiesCountDom();
}

function setDurationInMinutes(duration) {
  durationInMinutes = duration;
  localStorage.setItem("duration", duration);
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

function chooseRandomWord() {
  const members = category.members.slice();
  for (let i = 0; i < 100; i++) {
    members.sort(() => (Math.random() > 0.5 ? -1 : 1));
  }
  return category.members[Math.floor(Math.random() * category.members.length)];
}

function seedRandom() {
  for (let i = 0; i < 100; i++) {
    Math.random(); // seeding random masalan
  }
}

function populateAssignPlayersPage() {
  seedRandom();
  const word = chooseRandomWord();

  const assigners = new Set();
  const assignersIterator = assigners[Symbol.iterator]();

  const spyIndexes = [];

  new Array(spiesCount).fill(1).forEach(() => {
    seedRandom();
    let index = Math.floor(Math.random() * playersCount);
    while (spyIndexes.includes(index)) {
      index = Math.floor(Math.random() * playersCount);
    }
    spyIndexes.push(index);
  });

  new Array(playersCount).fill(1).forEach((_, index) => {
    if (spyIndexes.includes(index)) {
      assigners.add(new Assigner(word, true, assignersIterator));
    } else {
      assigners.add(new Assigner(word, false, assignersIterator));
    }
  });

  assignersIterator.next().value.invoke();
}

function convertSecondsToTimer(durationCountdown) {
  const minutes = Math.floor(durationCountdown / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (durationCountdown % 60).toString().padStart(2, "0");
  return minutes + ":" + seconds;
}

function populateTimer() {
  let durationCountdown = durationInMinutes * 60;
  document.querySelector(
    "." + PAGES.timerCountdown
  ).children[0].innerText = convertSecondsToTimer(durationCountdown);

  setInterval(() => {
    durationCountdown--;
    document.querySelector(
      "." + PAGES.timerCountdown
    ).children[0].innerText = convertSecondsToTimer(durationCountdown);
  }, 1000);
}

function showPage(page) {
  document.querySelector("." + PAGES.startPage).style.display = "none";
  document.querySelector("." + PAGES.setPlayers).style.display = "none";
  document.querySelector("." + PAGES.setSpies).style.display = "none";
  document.querySelector("." + PAGES.setDuration).style.display = "none";
  document.querySelector("." + PAGES.setCategory).style.display = "none";
  document.querySelector("." + PAGES.assignPlayers).style.display = "none";
  document.querySelector("." + PAGES.timerCountdown).style.display = "none";

  if (page === PAGES.assignPlayers) {
    populateAssignPlayersPage();
  }

  if (page === PAGES.timerCountdown) {
    populateTimer();
  }

  document.querySelector("." + page).style.display = "flex";
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

window.showTimer = function () {
  showPage(PAGES.timerCountdown);
};

window.restart = function () {
  window.location.reload();
};
