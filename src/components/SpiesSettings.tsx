import { useContext } from "react";
import {
  GlobalContext,
  globalContextProvider,
} from "../data-providers/GlobalContext";
import { useCalculator } from "../hooks/useCalculator";
import { useSettingsStyles } from "../hooks/useSettingsStyles";

export default function SpiesSettings() {
  const { spiesCount } = useContext(GlobalContext);
  const calculator = useCalculator();
  const classes = useSettingsStyles();

  return (
    <div className={classes.container}>
      <button
        onClick={globalContextProvider.decreaseSpiesCount}
        disabled={!calculator.spiesCanBeDecreased}
      >
        <h1>-</h1>
      </button>
      <h1>Spies: {spiesCount}</h1>
      <button
        onClick={globalContextProvider.increaseSpiesCount}
        disabled={!calculator.spiesCanBeIncreased}
      >
        <h1>+</h1>
      </button>
    </div>
  );
}
