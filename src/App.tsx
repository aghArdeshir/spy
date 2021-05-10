import { useEffect, useState } from "react";
import {
  GlobalContext,
  globalContextProvider,
} from "./data-providers/GlobalContext";
import Router from "./pages/Router";

export default function App() {
  const [globalContext, setGlobalContext] = useState(
    globalContextProvider.getState()
  );

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
