import { useContext } from "react";
import {
  GlobalContext,
  globalContextProvider,
} from "../data-providers/GlobalContext";
import { useSettingsStyles } from "../hooks/useSettingsStyles";

export default function ThemeSettings() {
  const { theme } = useContext(GlobalContext);
  const classes = useSettingsStyles();

  return (
    <div className={classes.container}>
      <button onClick={globalContextProvider.toggleTheme}>
        <h1>Toggle Theme (current: {theme})</h1>
      </button>
    </div>
  );
}
