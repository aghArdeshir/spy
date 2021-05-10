import { useContext } from "react";
import {
  GlobalContext,
  globalContextProvider,
} from "../data-providers/GlobalContext";
import { useCalculator } from "../hooks/useCalculator";
import { useSettingsStyles } from "../hooks/useSettingsStyles";

export default function PlayerSettings() {
  const { playersCount } = useContext(GlobalContext);
  const calculator = useCalculator();
  const classes = useSettingsStyles();

  return (
    <div className={classes.container}>
      <button
        onClick={globalContextProvider.decreasePlayersCount}
        disabled={!calculator.playersCanBeDecreased}
      >
        <h1>-</h1>
      </button>
      <h1>Players: {playersCount}</h1>
      <button onClick={globalContextProvider.increasePlayersCount}>
        <h1>+</h1>
      </button>
    </div>
  );
}
