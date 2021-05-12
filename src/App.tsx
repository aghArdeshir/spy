import { GlobalContext } from "./data-providers/GlobalContext";
import { useGlobalContext } from "./hooks/useGlobalContext";
import Router from "./pages/Router";

export default function App() {
  const globalContext = useGlobalContext();

  return (
    <GlobalContext.Provider value={globalContext}>
      <Router />
    </GlobalContext.Provider>
  );
}
