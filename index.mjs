import { Assigner } from "./Assigner.mjs";
import { CATEGORIES } from "./categories.mjs";
import { PAGES } from "./pages.mjs";

let playersCount = +localStorage.getItem("players") || 6;
let spiesCount = +localStorage.getItem("spies") || 1;
let durationInMinutes = +localStorage.getItem("duration") || 10;

let category;
const storedCategoryName = localStorage.getItem("category");
if (storedCategoryName) {
  category = Object.values(CATEGORIES).find(
    (c) => c.name === storedCategoryName
  );
} else {
  category = CATEGORIES.sports;
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

function setPlayersCount(count) {
  if (count > spiesCount * 2) {
    playersCount = count;
    localStorage.setItem("players", count);
  } else {
    alert("Players must be more than twice the count of spies.");
  }
  updatePlayersCountDom();
}

function setSpiesCount(count) {
  if (count >= playersCount / 2) {
    alert("Spies must be less than half of players.");
  } else {
    spiesCount = count;
    localStorage.setItem("spies", count);
  }
  updateSpiesCountDom();
}

function setDurationInMinutes(duration) {
  durationInMinutes = duration;
  localStorage.setItem("duration", duration);
  updateDurationDom();
}

function setCategory(selectedCategory) {
  category = selectedCategory;
  localStorage.setItem("category", selectedCategory.name);
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

function randomizeMembers(members) {
  for (let i = 0; i < 100; i++) {
    members.sort(() => (Math.random() > 0.5 ? -1 : 1));
  }
}

function chooseRandomWord() {
  let alreadyChosenWords = [];
  const storedAlreadyChosenWords = localStorage.getItem(
    "chosen:" + category.name
  );
  if (storedAlreadyChosenWords) {
    alreadyChosenWords = JSON.parse(storedAlreadyChosenWords);
  }

  let members = category.members
    .slice()
    .filter((member) => alreadyChosenWords.indexOf(member) === -1);

  if (members.length === 0) {
    members = category.members.slice();
    alreadyChosenWords = [];
    localStorage.removeItem("chosen:" + category.name);
  }

  randomizeMembers(members);

  const result = members[Math.floor(Math.random() * members.length)];

  alreadyChosenWords.push(result);
  localStorage.setItem(
    "chosen:" + category.name,
    JSON.stringify(alreadyChosenWords)
  );

  return result;
}

function populateAssignPlayersPage() {
  const word = chooseRandomWord();

  const spyIndexes = [];

  new Array(spiesCount).fill(1).forEach(() => {
    let index = Math.floor(Math.random() * playersCount);
    while (spyIndexes.includes(index)) {
      index = Math.floor(Math.random() * playersCount);
    }
    spyIndexes.push(index);
  });

  const assignersSet = new Set();
  const assignersIterator = assignersSet[Symbol.iterator]();

  const assignersArray = [];
  new Array(playersCount).fill(1).forEach((_, index) => {
    if (spyIndexes.includes(index)) {
      assignersArray.push(new Assigner(word, true, assignersIterator));
    } else {
      assignersArray.push(new Assigner(word, false, assignersIterator));
    }
  });

  randomizeMembers(assignersArray);

  assignersArray.forEach((assigner) => assignersSet.add(assigner));

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

function populateCategoriesSelector() {
  document.querySelector("." + PAGES.setCategory).innerHTML = "";

  Object.keys(CATEGORIES).forEach((key) => {
    const currentCategory = CATEGORIES[key];

    const button = document.createElement("button");
    button.innerText = currentCategory.name;
    button.onclick = () => {
      setCategory(currentCategory);
      showPage(PAGES.startPage);
    };

    const p = document.createElement("p");
    const members = currentCategory.members;
    randomizeMembers(members);
    p.innerText = members.slice(0, 40).join("، ") + "...";
    button.appendChild(p);

    document.querySelector("." + PAGES.setCategory).appendChild(button);
  });
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

  if (page === PAGES.setCategory) {
    populateCategoriesSelector();
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
