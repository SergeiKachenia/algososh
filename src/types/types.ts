import { ElementStates } from "./element-states";

export interface IStringChar {
  adding?: boolean;
  deleting?: boolean;
  noArrow?: boolean;
  tail?: string;
  head?: string;
  item?: string;
  state: ElementStates;
  extraCircle?: {
    item: string;
  }
}

export interface columnObject {
  num: number;
  state: ElementStates;
}

export type radioButtonState = "selection" | "bubble";
