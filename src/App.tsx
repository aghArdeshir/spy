import {
  GlobalContext,
  useGlobalContext,
} from "./data-providers/GlobalContext";
import Router from "./pages/Router";

export default function App() {
  const globalContext = useGlobalContext();

  return (
    <GlobalContext.Provider value={globalContext}>
      <Router />
    </GlobalContext.Provider>
  );
}
