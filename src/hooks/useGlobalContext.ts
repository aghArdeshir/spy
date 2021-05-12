import { useEffect, useState } from "react";
import { globalContextProvider } from "../data-providers/GlobalContext";

export function useGlobalContext() {
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

  return globalContext;
}
