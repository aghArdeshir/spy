import { useContext } from "react";
import { Calculator } from "../data-providers/Calculator";
import { GlobalContext } from "../data-providers/GlobalContext";

export function useCalculator() {
  const { playersCount, spiesCount } = useContext(GlobalContext);

  return new Calculator(playersCount, spiesCount);
}
