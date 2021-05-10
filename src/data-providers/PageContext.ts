import { createContext } from "react";

type I_Page_Context = "main" | "assigner" | "timer";

export const PageContext = createContext<I_Page_Context>("main");
