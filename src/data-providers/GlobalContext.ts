import { createContext } from "react";
import { Calculator } from "./Calculator";

type I_Global_Context = {
  playersCount: number;
  spiesCount: number;
  timeInMinutes: number;
  category: "jobs" | "iranCities" | "food" | "sports" | "countries";
  theme: "dark" | "light";
};

const DEFAULT_GLOBAL_CONTEXT: I_Global_Context = {
  playersCount: 5,
  spiesCount: 1,
  timeInMinutes: 2,
  category: "jobs",
  theme: "dark",
};

export const GlobalContext = createContext<I_Global_Context>(
  DEFAULT_GLOBAL_CONTEXT
);

export const globalContextProvider = new (class GlobalContextProvider {
  private localStorageKey = "global_context";
  private state = DEFAULT_GLOBAL_CONTEXT;
  public EventEmitter = new EventTarget(); // TODO: type-guard it, e.g. only provides `change` event

  constructor() {
    this.increasePlayersCount = this.increasePlayersCount.bind(this);
    this.decreasePlayersCount = this.decreasePlayersCount.bind(this);
    this.increaseSpiesCount = this.increaseSpiesCount.bind(this);
    this.decreaseSpiesCount = this.decreaseSpiesCount.bind(this);
    this.increaseTimeByOneMinute = this.increaseTimeByOneMinute.bind(this);
    this.decreaseTimeByOneMinute = this.decreaseTimeByOneMinute.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);

    this.syncState();
  }

  private syncState() {
    const valueAsString = localStorage.getItem(this.localStorageKey);

    if (valueAsString) {
      try {
        this.state = JSON.parse(valueAsString);
      } catch {
        this.state = DEFAULT_GLOBAL_CONTEXT;
        this.saveState();
      }
    } else {
      this.state = DEFAULT_GLOBAL_CONTEXT;
      this.saveState();
    }
  }

  private saveState() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.state));
    this.EventEmitter.dispatchEvent(new Event("change"));
  }

  public getState() {
    return this.state;
  }

  public setState(state: I_Global_Context) {
    this.state = state;
    this.saveState();
  }

  public increasePlayersCount() {
    this.state.playersCount++;
    this.saveState();
  }

  public decreasePlayersCount() {
    const calculator = new Calculator(
      this.state.playersCount,
      this.state.spiesCount
    );

    if (calculator.playersCanBeDecreased) {
      this.state.playersCount--;
      this.saveState();
    }
  }

  public increaseSpiesCount() {
    const calculator = new Calculator(
      this.state.playersCount,
      this.state.spiesCount
    );

    if (calculator.spiesCanBeIncreased) this.state.spiesCount++;
    this.saveState();
  }

  public decreaseSpiesCount() {
    const calculator = new Calculator(
      this.state.playersCount,
      this.state.spiesCount
    );

    if (calculator.spiesCanBeDecreased) {
      this.state.spiesCount--;
      this.saveState();
    }
  }

  public increaseTimeByOneMinute() {
    this.state.timeInMinutes++;
    this.saveState();
  }

  public decreaseTimeByOneMinute() {
    if (this.state.timeInMinutes > 1) {
      this.state.timeInMinutes--;
      this.saveState();
    }
  }

  public toggleTheme() {
    if (this.state.theme === "dark") {
      this.state.theme = "light";
    } else {
      this.state.theme = "dark";
    }
    this.saveState();
  }
})();
