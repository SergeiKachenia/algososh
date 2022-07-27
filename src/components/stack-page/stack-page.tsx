import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IStringChar } from "../../types/types";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { IStack, Stack } from "./utils";

export const StackPage: React.FC = () => {

  const exampleStack = new Stack<string>();
  const [inputValue, setInputValue] = useState<string>("");
  const [arrLetters, setArrLetters] = useState<IStringChar[]>([]);
  const [isPushing, setisPushing] = useState(false);
  const [isPopping, setisPopping] = useState(false);
  const [stack, setStack] = useState<IStack<string>>(exampleStack);

  const sortAndWait = async (arr: IStringChar[]) => {
    setArrLetters([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const pushAndRender = async () => {
    setisPushing(true);
    setInputValue("");
    stack.push(inputValue);
    arrLetters.forEach((elem) => {
      elem.state = ElementStates.Default;
      elem.head = "";
    });
    const newElement = stack!.peak();
    arrLetters.push({
      item: newElement ? newElement : "",
      state: ElementStates.Default,
    });
    await sortAndWait(arrLetters);
    arrLetters[arrLetters.length - 1].head = "top";
    arrLetters[arrLetters.length - 1].state = ElementStates.Changing;
    await sortAndWait(arrLetters);
    setisPushing(false);
  };

  const popAndRender = async () => {
    setisPopping(true);
    stack!.pop();
    const size = stack.getSize();
    if (size !== 0) {
      arrLetters.pop();
      setArrLetters([...arrLetters]);
      await delay(SHORT_DELAY_IN_MS);
      arrLetters[arrLetters.length - 1].state = ElementStates.Changing;
      arrLetters[arrLetters.length - 1].head = "top";
      setArrLetters([...arrLetters]);
    } else {
      setArrLetters([]);
    }
    setisPopping(false);
  };

  const clear = async () => {
    stack.clear();
    setArrLetters([]);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <Input
          placeholder="Введите текст"
          min={1}
          value={inputValue || ""}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          isLimitText={true}
          maxLength={4}
        />
        <Button
          disabled={!inputValue || isPushing || arrLetters.length > 12}
          isLoader={isPushing}
          text="Добавить"
          type="button"
          onClick={() => pushAndRender()}
        />
        <Button
          isLoader={isPopping}
          disabled={!arrLetters.length || isPopping}
          text="Удалить"
          type="button"
          onClick={() => popAndRender()}
        />
        <Button
          extraClass={styles.resetButton}
          disabled={!arrLetters.length || isPopping || isPushing}
          text="Очистить"
          type="button"
          onClick={() => clear()}
        />
      </form>
      <ul className={styles.circleList}>
        {arrLetters.map((item, index) => {
          return (
            <Circle
              state={item.state}
              letter={item.item}
              index={index}
              key={index}
              head={item.head}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
