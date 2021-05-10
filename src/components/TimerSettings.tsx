import { useContext } from "react";
import {
  GlobalContext,
  globalContextProvider,
} from "../data-providers/GlobalContext";
import { useSettingsStyles } from "../hooks/useSettingsStyles";

export default function TimerSettings() {
  const { timeInMinutes } = useContext(GlobalContext);
  const classes = useSettingsStyles();

  return (
    <div className={classes.container}>
      <button
        onClick={globalContextProvider.decreaseTimeByOneMinute}
        disabled={timeInMinutes <= 1}
      >
        <h1>-</h1>
      </button>
      <h1>Time: {timeInMinutes} minutes</h1>
      <button onClick={globalContextProvider.increaseTimeByOneMinute}>
        <h1>+</h1>
      </button>
    </div>
  );
}
