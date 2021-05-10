import { createContext } from "react";
import { clone } from "lodash";

type I_Global_Context = {
  players: number;
  spies: number;
  timer: number; // in minutes
  category: "jobs" | "iranCities" | "food" | "sports" | "countries";
  theme: "dark" | "light";
};

const DEFAULT_GLOBAL_STATE: I_Global_Context = {
  players: 5,
  spies: 1,
  timer: 2,
  category: "jobs",
  theme: "dark",
};

export const GlobalContext =
  createContext<I_Global_Context>(DEFAULT_GLOBAL_STATE);

export const globalContextProvider = new (class GlobalContextProvider {
  private localStorageKey = "global_context";
  private globalContext = DEFAULT_GLOBAL_STATE;
  public EventEmitter = new EventTarget(); // TODO: type-guard it

  constructor() {
    this.syncState();

    this.increasePlayers = this.increasePlayers.bind(this);
    this.decreasePlayers = this.decreasePlayers.bind(this);
  }

  private syncState() {
    const valueAsString = localStorage.getItem(this.localStorageKey);

    if (valueAsString) {
      try {
        this.globalContext = JSON.parse(valueAsString);
      } catch {
        this.globalContext = DEFAULT_GLOBAL_STATE;
        this.saveState();
      }
    } else {
      this.globalContext = DEFAULT_GLOBAL_STATE;
      this.saveState();
    }
  }

  private saveState() {
    this.globalContext = clone(this.globalContext);
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.globalContext)
    );
    this.EventEmitter.dispatchEvent(new Event("change"));
  }

  public getState() {
    return this.globalContext;
  }

  public setState(state: I_Global_Context) {
    this.globalContext = state;
    this.saveState();
  }

  public increasePlayers() {
    this.globalContext.players++;
    this.saveState();
  }

  public decreasePlayers() {
    this.globalContext.players--;
    this.saveState();
  }
})();
