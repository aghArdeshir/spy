import { createUseStyles } from "react-jss";

export const useSettingsStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    "& button": {
      background: "none",
      border: "none",
    },

    "& h1": {
      flex: 1,
      width: 300,
      maxWidth: 300,
      textAlign: "center",
    },
  },
});
