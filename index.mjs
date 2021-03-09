import { Assigner } from "./Assigner.mjs";
import { CATEGORIES } from "./categories.mjs";
import { PAGES } from "./pages.mjs";

const ONE_SECOND = 1000;
const ANIMAL_SOUNDS = [
  "buffalo",
  "camel",
  "cat",
  "chicken",
  "crow",
  "dog",
  "duck",
  "elephant",
  "falcon",
  "frog",
  "horse",
  "lion",
  "moose",
  "otter",
  "owl",
  "raccoon",
  "robin",
  "sheep",
  "tiger",
  "wolf",
  "zebra",
];

let playersCount = +localStorage.getItem("spy-players") || 6;
let spiesCount = +localStorage.getItem("spy-spies") || 1;
let durationInMinutes = +localStorage.getItem("spy-duration") || 10;
let theme = localStorage.getItem("spy-theme") || "light";

let category;
const storedCategoryName = localStorage.getItem("spy-category");
if (storedCategoryName) {
  category = Object.values(CATEGORIES).find(
    (c) => c.name === storedCategoryName
  );
}
if (!category) {
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

function updateThemeDom() {
  document.querySelector("#theme-button").children[1].innerText = theme;

  if (theme === "light") {
    document.body.parentElement.classList.remove("dark");
  } else {
    document.body.parentElement.classList.add("dark");
  }
}

function setPlayersCount(count) {
  if (count > spiesCount * 2) {
    playersCount = count;
    localStorage.setItem("spy-players", count);
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
    localStorage.setItem("spy-spies", count);
  }
  updateSpiesCountDom();
}

function setDurationInMinutes(duration) {
  durationInMinutes = duration;
  localStorage.setItem("spy-duration", duration);
  updateDurationDom();
}

function setCategory(selectedCategory) {
  category = selectedCategory;
  localStorage.setItem("spy-category", selectedCategory.name);
  updateCategoryDom();
}

function switchTheme() {
  theme = theme === "light" ? "dark" : "light";
  localStorage.setItem("spy-theme", theme);
  updateThemeDom();
}
window.switchTheme = switchTheme;

function populateCountPikcerDom(page, callback) {
  for (let i = 0; i < 21; i++) {
    const button = document.createElement("button");
    button.innerText = i + 1;
    button.onclick = function () {
      callback(i + 1);
      showPage(PAGES.startPage);
    };
    document.querySelector("." + page).appendChild(button);
  }
}

function shuffleArray(members) {
  for (let i = 0; i < 100; i++) {
    members.sort(() => (Math.random() > 0.5 ? -1 : 1));
  }
}

function randomNumber(ceil) {
  return Math.floor(Math.random() * ceil);
}

function chooseRandomWord() {
  const localStorageKey = "spy-chosen:" + category.name;

  let alreadyChosenWords = [];
  const storedAlreadyChosenWords = localStorage.getItem(localStorageKey);
  if (storedAlreadyChosenWords) {
    alreadyChosenWords = JSON.parse(storedAlreadyChosenWords);
  }

  let members = category.members
    .slice()
    .filter((member) => !alreadyChosenWords.includes(member));

  if (members.length === 0) {
    members = category.members.slice();
    alreadyChosenWords = [];
    localStorage.removeItem(localStorageKey);
  }

  shuffleArray(members);

  const result = members[randomNumber(members.length)];

  alreadyChosenWords.push(result);
  localStorage.setItem(localStorageKey, JSON.stringify(alreadyChosenWords));

  return result;
}

function populateAssignPlayersPage() {
  const word = chooseRandomWord();

  const spyIndexes = [];

  new Array(spiesCount).fill(1).forEach(() => {
    let index = randomNumber(playersCount);
    while (spyIndexes.includes(index)) {
      index = randomNumber(playersCount);
    }
    spyIndexes.push(index);
  });

  const assignersArray = [];
  const assignersSet = new Set();
  const assignersIterator = assignersSet[Symbol.iterator]();

  new Array(playersCount).fill(1).forEach((_, index) => {
    if (spyIndexes.includes(index)) {
      assignersArray.push(new Assigner(word, true, assignersIterator));
    } else {
      assignersArray.push(new Assigner(word, false, assignersIterator));
    }
  });

  shuffleArray(assignersArray);

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

let intervalRef;
let durationInSeconds;
function populateTimer() {
  const timerDom = document.querySelector("." + PAGES.timerCountdown)
    .children[0];

  durationInSeconds = durationInMinutes * 60;
  timerDom.innerText = convertSecondsToTimer(durationInSeconds);

  resumeTimer();
}

function resumeTimer() {
  const timerDom = document.querySelector("." + PAGES.timerCountdown)
    .children[0];

  intervalRef = setInterval(() => {
    durationInSeconds--;
    timerDom.innerText = convertSecondsToTimer(durationInSeconds);

    if (durationInSeconds === 0) {
      clearInterval(intervalRef);
      const animal = ANIMAL_SOUNDS[randomNumber(ANIMAL_SOUNDS.length)];
      const finishAudio = new Audio("./animal-sounds/" + animal + ".mp3");
      setTimeout(() => {
        timerDom.innerText =
          "spy is a " +
          animal[0].toUpperCase() +
          animal.substring(1, animal.length);
        finishAudio.play();
      }, 1000);
    }
  }, ONE_SECOND);
}

function pauseTimer() {
  clearInterval(intervalRef);
}

function populateCategoriesSelector() {
  const categoriesDom = document.querySelector("." + PAGES.setCategory);
  categoriesDom.innerHTML = "";

  Object.keys(CATEGORIES).forEach((key) => {
    const intendedCaetgory = CATEGORIES[key];

    const button = document.createElement("button");
    button.innerText = intendedCaetgory.name;
    button.onclick = () => {
      setCategory(intendedCaetgory);
      showPage(PAGES.startPage);
    };

    const p = document.createElement("p");

    const intendedCategoryMembers = intendedCaetgory.members;
    shuffleArray(intendedCategoryMembers);
    p.innerText = intendedCategoryMembers.slice(0, 20).join("، ") + "...";

    button.appendChild(p);

    categoriesDom.appendChild(button);
  });

  const contributeLink = document.createElement("a");
  contributeLink.target = "_blank";
  contributeLink.href =
    "https://github.com/Ardeshir81/spy/blob/main/categories.mjs";
  contributeLink.style.width = "100%";

  const contributeButton = document.createElement("button");
  contributeButton.innerText = "Contribute 🔗";
  contributeButton.style.width = "100%";

  contributeLink.appendChild(contributeButton);
  categoriesDom.appendChild(contributeLink);
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

let firstTimeHtml = "";
window.onload = function () {
  firstTimeHtml = document.body.innerHTML;
  updatePlayersCountDom();
  updateSpiesCountDom();
  updateDurationDom();
  updateCategoryDom();
  updateThemeDom();

  showPage(PAGES.startPage);

  populateCountPikcerDom(PAGES.setPlayers, setPlayersCount);
  populateCountPikcerDom(PAGES.setSpies, setSpiesCount);
  populateCountPikcerDom(PAGES.setDuration, setDurationInMinutes);
};

window.showPage = showPage;

window.showTimer = function () {
  showPage(PAGES.timerCountdown);
};

window.toggleTimer = function () {
  const timerToggler = document.querySelector("#timer-toggler");
  if (timerToggler.textContent === "Pause Timer") {
    pauseTimer();
    timerToggler.textContent = "Resume Timer";
  } else {
    resumeTimer();
    timerToggler.textContent = "Pause Timer";
  }
};

window.restart = function () {
  if (intervalRef) clearInterval(intervalRef);
  document.body.innerHTML = firstTimeHtml;
  window.onload();
};
