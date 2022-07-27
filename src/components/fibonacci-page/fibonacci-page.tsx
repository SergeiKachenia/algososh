import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>();
  const [arrNumbers, setArrNumbers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderFib = async () => {
    setInputValue(0);
    setIsLoading(true);
      let arr: number[] = [0, 1];
      if (inputValue) {
      for (let i = 2; i < inputValue + 2; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
      }
    }
      let slicedArr = arr.slice(1);
    const fiboCopy = [...slicedArr];
    const cycleArr: number[] = [];
    for (let elem of fiboCopy) {
      await delay(SHORT_DELAY_IN_MS);
      cycleArr.push(elem);
      setArrNumbers([...cycleArr]);
    }
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <Input
          placeholder="Введите число от 1 до 19"
          min={1}
          isFib={true}
          value={inputValue || ""}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputValue(Number(e.currentTarget.value.replace(/[^0-9]/g, "")))
          }
          isLimitText={true}
          maxLength={2}
          max={19}
        />
        <Button
          disabled={inputValue ? inputValue > 19 : true}
          isLoader={isLoading}
          text="Развернуть"
          type="button"
          onClick={() => inputValue && renderFib()}
        />
      </form>
      <ul className={styles.fibList}>
        {arrNumbers.map((num, index) => {
          return <Circle letter={num.toString()} key={index} index={index} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
