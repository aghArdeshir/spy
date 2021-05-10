import { useEffect, useState } from "react";
import {
  GlobalContext,
  globalContextProvider,
} from "./data-providers/GlobalContext";
import { useApplyTheme } from "./hooks/useApplyTheme";
import Router from "./pages/Router";

export default function App() {
  const [globalContext, setGlobalContext] = useState(
    globalContextProvider.getState()
  );

  useApplyTheme();

  useEffect(() => {
    function listener() {
      setGlobalContext(globalContextProvider.getState());
    }

    globalContextProvider.EventEmitter.addEventListener("change", listener);

    return function () {
      globalContextProvider.EventEmitter.removeEventListener(
        "change",
        listener
      );
    };
  }, []);

  return (
    <GlobalContext.Provider value={globalContext}>
      <Router />
    </GlobalContext.Provider>
  );
}
