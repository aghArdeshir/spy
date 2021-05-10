import { createUseStyles } from "react-jss";
import PlayerSettings from "../components/PlayerSettings";
import SpiesSettings from "../components/SpiesSettings";
import TimerSettings from "../components/TimerSettings";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",

    "& div": { flex: 1 },
  },
});

export default function Main() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <PlayerSettings />
      </div>
      <div>
        <SpiesSettings />
      </div>
      <div>
        <TimerSettings />
      </div>
      <div>Category</div>
      <div>Theme</div>
      <div>Start</div>
    </div>
  );
}
