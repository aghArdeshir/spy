import { useSettingsStyles } from "../hooks/useSettingsStyles";

export default function StartButton() {
  const classes = useSettingsStyles();

  return (
    <div className={classes.container}>
      <button>
        <h1>Start</h1>
      </button>
    </div>
  );
}
