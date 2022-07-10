import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { IStringChar } from "../../types/types";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { swapString } from "./utils";
import styles from "./string.module.css";


export const StringComponent: React.FC = () => {
  const [inputString, setInputString] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [arrLetters, setArrLetters] = useState<IStringChar[]>([]);

  const reverseString = async () => {
    setInputString("");
    setIsLoading(true);
    const arrChars: IStringChar[] = [];
    inputString.split("").forEach((item) => {
      arrChars.push({ item: item, state: ElementStates.Default });
    });
    setArrLetters([...arrChars]);
    await delay();
    const numberOfSteps: number = swapString(inputString).numberOfSteps;
    let step = 0;
    while (step !== numberOfSteps) {
      arrChars[step].state = ElementStates.Changing;
      arrChars[inputString.length - (step + 1)].state = ElementStates.Changing;
      setArrLetters([...arrChars]);
      await delay(SHORT_DELAY_IN_MS);
      swapString(inputString, step + 1).resultArray.forEach((item, index) => {
        arrChars[index].item = item;
      });
      arrChars[step].state = ElementStates.Modified;
      arrChars[inputString.length - (step + 1)].state = ElementStates.Modified;
      setArrLetters([...arrChars]);
      await delay(SHORT_DELAY_IN_MS);
      step++;
    }
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <Input
          isLimitText={true}
          maxLength={11}
          value={inputString}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputString(e.currentTarget.value)
          }
        ></Input>
        <Button
          text="Развернуть"
          onClick={() => reverseString()}
          disabled={!inputString}
          isLoader={isLoading}
          type="submit"
        ></Button>
      </form>
      <ul className={styles.circle}>
        {arrLetters.map((item, index) => {
          return (
            <Circle
              state={item.state}
              key={index}
              letter={item.item}
              index={index}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
