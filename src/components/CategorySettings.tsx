import { useContext } from "react";
import {
  GlobalContext,
  globalContextProvider,
} from "../data-providers/GlobalContext";
import { useSettingsStyles } from "../hooks/useSettingsStyles";

export default function CategorySettings() {
  const { category } = useContext(GlobalContext);
  const classes = useSettingsStyles();

  return (
    <div className={classes.container}>
      <button onClick={globalContextProvider.selectPreviousCategory}>
        <h1>&lt;</h1>
      </button>

      <h1>Category: {category}</h1>

      <button onClick={globalContextProvider.selectNextCategory}>
        <h1>&gt;</h1>
      </button>
    </div>
  );
}
