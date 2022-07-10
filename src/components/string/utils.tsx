import { IStringChar, columnObject } from "../../types/types";

export const swapElements = (
  arr: columnObject[] | IStringChar[] | string[] | number[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const swapString = (
  string: string,
  step?: number
): { resultArray: string[]; numberOfSteps: number } => {
  let stepCounter = 0;
  const arrayOfChars: string[] = [];
  string.split("").forEach((el) => arrayOfChars.push(el));
  let startIdx = 0;
  let endIdx = arrayOfChars.length - 1;
  while (endIdx >= startIdx) {
    if (step && step === stepCounter) break;
    swapElements(arrayOfChars, startIdx, endIdx);
    startIdx++;
    endIdx--;
    stepCounter++;
  }
  return { resultArray: arrayOfChars, numberOfSteps: stepCounter };
};
