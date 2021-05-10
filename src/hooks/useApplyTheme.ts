import { useContext, useEffect } from "react";
import { GlobalContext } from "../data-providers/GlobalContext";

export function useApplyTheme() {
  const theme = useContext(GlobalContext).theme;

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);
}
