import { globalContextProvider } from "../data-providers/GlobalContext";

export const themeService = new (class ThemeService {
  private applyTheme() {
    const { theme } = globalContextProvider.getState();
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  init() {
    this.applyTheme();
    globalContextProvider.EventEmitter.addEventListener(
      "change",
      this.applyTheme
    );
  }
})();
