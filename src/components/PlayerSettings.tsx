import { useContext } from "react";
import {
  GlobalContext,
  globalContextProvider,
} from "../data-providers/GlobalContext";
import { useSettingsStyles } from "../hooks/useSettingsStyles";

export default function PlayerSettings() {
  const playersCount = useContext(GlobalContext).players;
  const classes = useSettingsStyles();

  return (
    <div className={classes.container}>
      <button onClick={globalContextProvider.decreasePlayers}>
        <h1>-</h1>
      </button>
      <h1>Players: {playersCount}</h1>
      <button onClick={globalContextProvider.increasePlayers}>
        <h1>+</h1>
      </button>
    </div>
  );
}
