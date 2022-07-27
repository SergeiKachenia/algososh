import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IStringChar } from "../../types/types";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { IQueue, Queue } from "./utils";

export const QueuePage: React.FC = () => {

  const newQueue = new Queue<string>(6);
  const basicState: IStringChar[] = Array.from({ length: 6 }, () => ({
    item: "",
    state: ElementStates.Default,
  }));

  const [inputValue, setInputValue] = useState<string>("");
  const [arrLetters, setArrLetters] =
    useState<IStringChar[]>(basicState);
  const [isPushing, setIsPushing] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [queue, setQueue] = useState<IQueue<string>>(newQueue);
  const [headIndex, setHeadIndex] = useState<number | null>(null);

  const sortAndWait = async (arr: IStringChar[]) => {
    setArrLetters([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const enqueue = async () => {
    setIsPushing(true);
    setInputValue("");
    const copyArr = [...arrLetters];
    queue.enqueue(inputValue);
    const newHead = queue.getHead();
    const newTail = queue.getTail();
    copyArr[newHead.index].item = newHead.value!;
    copyArr[newHead.index].head = "head";
    setHeadIndex(newHead.index);
    if (newTail.index > 0) copyArr[newTail.index - 1].tail = "";
    copyArr[newTail.index].item = newTail.value!;
    copyArr[newTail.index].tail = "tail";
    copyArr[newTail.index].state = ElementStates.Changing;
    await sortAndWait(copyArr);
    copyArr[newTail.index].state = ElementStates.Default;
    setIsPushing(false);
  };

  const dequeue = async () => {
    setIsPopping(true);
    const copyArr = [...arrLetters];
    const head = queue.getHead();
    const tail = queue.getTail();
    if (head.index === tail.index) clearQueue();
    else {
      queue.dequeue();
      const newHead = queue.getHead();
      if (newHead.index > 0) {
        copyArr[newHead.index - 1].head = "";
        copyArr[newHead.index - 1].item = "";
      }
      copyArr[newHead.index].item = newHead.value!;
      copyArr[newHead.index].head = "head";
      copyArr[newHead.index].state = ElementStates.Changing;
      await sortAndWait(copyArr);
      copyArr[newHead.index].state = ElementStates.Default;
    }
    setIsPopping(false);
  };

  const clearQueue = () => {
    const newQueue = new Queue<string>(6);
    setQueue(newQueue);
    setHeadIndex(null);
    setArrLetters([...basicState]);
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <Input
          placeholder="Введите значение"
          min={1}
          value={inputValue || ""}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          isLimitText={true}
          maxLength={4}
        />
        <Button
          disabled={
            !inputValue ||
            isPopping ||
            arrLetters[arrLetters.length - 1].item !== ""
          }
          isLoader={isPushing}
          text="Добавить"
          type="button"
          onClick={() => enqueue()}
        />
        <Button
          isLoader={isPopping}
          disabled={isPushing || headIndex === null}
          text="Удалить"
          type="button"
          onClick={() => dequeue()}
        />
        <Button
          extraClass={styles.resetButton}
          disabled={isPushing || isPopping || headIndex === null}
          text="Очистить"
          type="button"
          onClick={() => clearQueue()}
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
              tail={item.tail}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
