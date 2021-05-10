import { useContext } from "react";
import Main from "./Main";
import Assigner from "./Assigner";
import Timer from "./Timer";
import { PageContext } from "../data-providers/PageContext";

export default function Router() {
  const currentPage = useContext(PageContext);

  if (currentPage === "main") return <Main />;
  else if (currentPage === "assigner") return <Assigner />;
  else if (currentPage === "timer") return <Timer />;
  else return <></>;
}
