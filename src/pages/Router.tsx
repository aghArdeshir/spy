import { useContext } from "react";
import Main from "./Main";
import Assigner from "./Assigner";
import Timer from "./Timer";
import { PageContext } from "../data-providers/PageContext";
import { useApplyTheme } from "../hooks/useApplyTheme";

export default function Router() {
  const currentPage = useContext(PageContext);

  useApplyTheme();

  if (currentPage === "main") return <Main />;
  else if (currentPage === "assigner") return <Assigner />;
  else if (currentPage === "timer") return <Timer />;
  else {
    throw new Error("Bad routing");
  }
}
