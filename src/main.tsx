import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ScrambleWordsWithReducerClean } from "./ScrambledWords/ScrambledWordsClean";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScrambleWordsWithReducerClean />
  </StrictMode>
);
