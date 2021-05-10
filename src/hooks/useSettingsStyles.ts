import { createUseStyles } from "react-jss";

export const useSettingsStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "row",

    "& button": {
      background: "none",
      border: "none",
    },
  },
});
