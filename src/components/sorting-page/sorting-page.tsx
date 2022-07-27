import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { columnObject, radioButtonState } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { bubbleSortAlgo, selectionSortAlgo } from "./utils";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [arrSort, setArrSort] = useState<columnObject[]>([]);
  const [checked, setChecked] = useState<radioButtonState>("selection");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ascendingRunning, setAscendingRunning] = useState(false);
  const [descendingRunning, setDescendingRunning] = useState(false);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const arr: columnObject[] = Array.from(
      { length: Math.random() * (17 - 3) + 3 },
      () => ({
        num: Math.floor(Math.random() * 100) + 1,
        state: ElementStates.Default,
      })
    );
    setArrSort([...arr]);
  };

  const sortAndWait = async (arr: columnObject[]) => {
    setArrSort([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };
  const bubbleSort = async (mode: "ascending" | "descending") => {
    setIsLoading(true);
    mode === "ascending"
      ? setAscendingRunning(true)
      : setDescendingRunning(true);
    const arr = [...arrSort];
    arr.forEach((el) => (el.state = ElementStates.Default));
    let stepCounter = 1;
    while (stepCounter !== bubbleSortAlgo(mode, arr).numberOfSteps) {
      await sortAndWait(bubbleSortAlgo(mode, arr, stepCounter).resultArray);
      stepCounter++;
    }
    setIsLoading(false);
    mode === "ascending"
      ? setAscendingRunning(false)
      : setDescendingRunning(false);
  };

  const selectionSort = async (mode: "ascending" | "descending") => {
    setIsLoading(true);
    mode === "ascending"
      ? setAscendingRunning(true)
      : setDescendingRunning(true);
    const arr = [...arrSort];
    let stepCounter = 1;
    while (stepCounter !== selectionSortAlgo(mode, arr).numberOfSteps) {
      await sortAndWait(selectionSortAlgo(mode, arr, stepCounter).resultArray);
      stepCounter++;
    }
    setIsLoading(false);
    mode === "ascending"
      ? setAscendingRunning(false)
      : setDescendingRunning(false);
  };
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapContainer}>
        <form
          className={styles.form}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <div className={styles.radioContainer}>
            <RadioInput
              disabled={isLoading}
              checked={checked === "selection"}
              onChange={() => setChecked("selection")}
              value="selection"
              label="Выбор"
            />
            <RadioInput
              disabled={isLoading}
              checked={checked === "bubble"}
              onChange={() => setChecked("bubble")}
              value="bubble"
              label="Пузырёк"
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              sorting={Direction.Ascending}
              disabled={isLoading}
              isLoader={ascendingRunning}
              text="По возрастанию"
              type="button"
              onClick={() =>
                checked === "selection"
                  ? selectionSort("ascending")
                  : bubbleSort("ascending")
              }
            />
            <Button
              sorting={Direction.Descending}
              disabled={isLoading}
              isLoader={descendingRunning}
              text="По убыванию"
              type="button"
              onClick={() =>
                checked === "selection"
                  ? selectionSort("descending")
                  : bubbleSort("descending")
              }
            />
          </div>
          <Button
            disabled={isLoading}
            isLoader={false}
            text="Новый массив"
            type="button"
            onClick={() => generateRandomArray()}
          />
        </form>
        <ul className={styles.columnList}>
          {arrSort.map((column, index) => {
            return (
              <Column index={column.num} state={column.state} key={index} />
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
