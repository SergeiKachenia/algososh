import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IStringChar } from "../../types/types";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { ILinkedList, LinkedList } from "./utils";

export const ListPage: React.FC = () => {

  useEffect(() => {
    const stringsArray = Array.from(
      { length: 6 },
      () => `${Math.floor(Math.random() * 100) + 1}`
    );
    const basicState: IStringChar[] = [];
    const newLinkedList = new LinkedList<string>(stringsArray);
    stringsArray.forEach((elem) => {
      basicState.push({
        item: elem,
        state: ElementStates.Default,
      });
    });

    setLinkedList(newLinkedList);
    setArrCircles(basicState.reverse());
  }, []);

  const [inputValue, setInputValue] = useState<string>("");
  const [index, setIndex] = useState<number>();
  const [arrCicrles, setArrCircles] = useState<IStringChar[]>([]);
  const [linkedList, setLinkedList] = useState<ILinkedList<string>>();
  const [addingToHead, setAddingToHead] = useState(false);
  const [addingToTail, setAddingToTail] = useState(false);
  const [deletingFromHead, setDeletingFromHead] = useState(false);
  const [deletingFromTail, setDeletingFromTail] = useState(false);
  const [addingByIndex, setAddingByIndex] = useState(false);
  const [deletingByIndex, setDeletingByIndex] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sortAndWait = async (arr: IStringChar[]) => {
    setArrCircles([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const addToHead = async () => {
    const copyArr = [...arrCicrles];
    setIsLoading(true);
    setAddingToHead(true);
    linkedList!.print();
    linkedList!.insertAt(inputValue, 0);
    const headValue = linkedList!.getNodeByIndex(0);
    linkedList!.print();
    copyArr[0] = {
      ...copyArr[0],
      adding: true,
      extraCircle: {
        item: headValue ? headValue : "",
      },
    };
    await sortAndWait([...copyArr]);
    copyArr[0] = {
      ...copyArr[0],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.unshift({
      item: headValue ? headValue : "",
      state: ElementStates.Modified,
    });
    await sortAndWait([...copyArr]);
    copyArr[0].state = ElementStates.Default;
    setIsLoading(false);
    setAddingToHead(false);
    setInputValue("");
  };

  const addToTail = async () => {
    const copyArr = [...arrCicrles];
    setIsLoading(true);
    setAddingToTail(true);
    linkedList!.print();
    linkedList!.addToTail(inputValue);
    const tailIdx = linkedList!.getSize() - 1;
    const TailValue = linkedList!.getNodeByIndex(tailIdx);
    linkedList!.print();
    for (let i = 0; i <= tailIdx; i++) {
      copyArr[i] = {
        ...copyArr[i],
        adding: true,
        extraCircle: {
          item: TailValue ? TailValue : "",
        },
      };
      if (i > 0) {
        copyArr[i - 1] = {
          ...copyArr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing,
        };
      }
      await sortAndWait([...copyArr]);
    }
    copyArr[copyArr.length - 1] = {
      ...copyArr[copyArr.length],
      item: TailValue ? TailValue : "",
      state: ElementStates.Modified,
      adding: false,
      extraCircle: undefined,
    };
    await sortAndWait([...copyArr]);
    copyArr.forEach((elem) => (elem.state = ElementStates.Default));
    await sortAndWait([...copyArr]);
    setIsLoading(false);
    setAddingToTail(false);
    setInputValue("");
  };

  const removeFromHead = async () => {
    const copyArr = [...arrCicrles];
    setIsLoading(true);
    setDeletingFromHead(true);
    linkedList!.print();
    const deletedElement = linkedList!.removeFromPosition(0);
    linkedList!.print();
    copyArr[0] = {
      ...copyArr[0],
      item: "",
      deleting: true,
      extraCircle: {
        item: deletedElement ? deletedElement : "",
      },
    };
    await sortAndWait([...copyArr]);
    copyArr.shift();
    copyArr[0].state = ElementStates.Modified;
    await sortAndWait([...copyArr]);
    copyArr[0].state = ElementStates.Default;
    setIsLoading(false);
    setDeletingFromHead(false);
  };

  const removeFromTail = async () => {
    const copyArr = [...arrCicrles];
    setIsLoading(true);
    setDeletingFromTail(true);
    linkedList!.print();
    const tailIdx = linkedList!.getSize() - 1;
    const deletedElement = linkedList!.removeFromPosition(tailIdx);
    linkedList!.print();
    copyArr[copyArr.length - 1] = {
      ...copyArr[copyArr.length - 1],
      item: "",
      deleting: true,
      extraCircle: {
        item: deletedElement ? deletedElement : "",
      },
    };
    await sortAndWait([...copyArr]);
    copyArr.pop();
    copyArr[copyArr.length - 2].state = ElementStates.Modified;
    await sortAndWait([...copyArr]);
    copyArr[copyArr.length - 2].state = ElementStates.Default;
    setIsLoading(false);
    setDeletingFromTail(false);
  };

  const addByIndex = async (index: number) => {
    const copyArr = [...arrCicrles];
    setIsLoading(true);
    setAddingByIndex(true);
    linkedList!.print();
    linkedList!.insertAt(inputValue, index);
    const newValue = linkedList!.getNodeByIndex(index);
    linkedList!.print();
    for (let i = 0; i <= index!; i++) {
      copyArr[i] = {
        ...copyArr[i],
        adding: true,
        extraCircle: {
          item: newValue ? newValue : "",
        },
      };
      if (i > 0)
        copyArr[i - 1] = {
          ...copyArr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing,
        };
      await sortAndWait([...copyArr]);
    }
    copyArr[index!] = {
      ...copyArr[index!],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.splice(index!, 0, {
      item: newValue ? newValue : "",
      state: ElementStates.Modified,
    });
    await sortAndWait([...copyArr]);
    copyArr.forEach((elem) => (elem.state = ElementStates.Default));
    setIsLoading(false);
    setAddingByIndex(false);
    setInputValue("");
    setIndex(undefined);
  };

  const removeByIndex = async (index: number) => {
    const copyArr = [...arrCicrles];
    setIsLoading(true);
    setDeletingByIndex(true);
    linkedList!.print();
    const deletedElement = linkedList!.removeFromPosition(index);
    linkedList!.print();
    for (let i = 0; i <= index!; i++) {
      copyArr[i].state = ElementStates.Changing;
      if (i === index) copyArr[i].noArrow = true;
      await sortAndWait([...copyArr]);
    }
    copyArr[index!] = {
      ...copyArr[index!],
      item: "",
      deleting: true,
      extraCircle: {
        item: deletedElement ? deletedElement : "",
      },
    };
    await sortAndWait([...copyArr]);
    copyArr.splice(index!, 1);
    copyArr.forEach((elem) => (elem.state = ElementStates.Default));
    setIsLoading(false);
    setDeletingByIndex(false);
    setIndex(undefined);
    await sortAndWait([...copyArr]);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
          <Input
            name="value"
            extraClass={styles.input}
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
            extraClass={styles.button}
            disabled={isLoading || !inputValue || arrCicrles.length > 12}
            isLoader={addingToHead}
            text="Добавить в head"
            type="button"
            onClick={() => addToHead()}
          />
          <Button
            extraClass={styles.button}
            isLoader={addingToTail}
            disabled={isLoading || !inputValue || arrCicrles.length > 12}
            text="Добавить в tail"
            type="button"
            onClick={() => addToTail()}
          />
          <Button
            extraClass={styles.button}
            disabled={isLoading || arrCicrles.length <= 1}
            isLoader={deletingFromHead}
            text="Удалить из head"
            type="button"
            onClick={() => removeFromHead()}
          />
          <Button
            extraClass={styles.button}
            disabled={isLoading || arrCicrles.length <= 1}
            isLoader={deletingFromTail}
            text="Удалить из tail"
            type="button"
            onClick={() => removeFromTail()}
          />
        </form>
        <form className={styles.form}>
          <Input
            name="index"
            type="text"
            extraClass={styles.input}
            placeholder="Введите индекс"
            maxLength={1}
            value={index || ""}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setIndex(Number(e.currentTarget.value.replace(/[^0-9]/g, "")))
            }
          />
          <Button
            extraClass={styles.bigButton}
            disabled={
              !index ||
              isLoading ||
              index > arrCicrles.length - 1 ||
              arrCicrles.length > 12
            }
            isLoader={addingByIndex}
            text="Добавить по индексу"
            type="button"
            onClick={() => index && addByIndex(index)}
          />
          <Button
            extraClass={styles.bigButton}
            isLoader={deletingByIndex}
            disabled={!index || isLoading || index > arrCicrles.length - 1}
            text="Удалить по индексу"
            type="button"
            onClick={() => index && removeByIndex(index)}
          />
        </form>
      </div>
      <ul className={styles.circleList}>
        {arrCicrles.map((item, index) => {
          return (
            <div className={styles.block} key={index}>
              <Circle
                state={item.state}
                letter={item.item}
                index={index}
                head={
                  index === 0 && !item.adding && !item.deleting ? "head" : ""
                }
                tail={
                  index === arrCicrles.length - 1 &&
                  !item.adding &&
                  !item.deleting
                    ? "tail"
                    : ""
                }
              />
              {index !== arrCicrles.length - 1 && (
                <ArrowIcon
                  fill={
                    item.state === ElementStates.Changing && !item.noArrow
                      ? "#d252e1"
                      : "#0032FF"
                  }
                />
              )}
              {item.adding && (
                <Circle
                  extraClass={styles.upperCircle}
                  state={ElementStates.Changing}
                  letter={item.extraCircle?.item}
                  isSmall={true}
                />
              )}
              {item.deleting && (
                <Circle
                  extraClass={styles.lowerCircle}
                  state={ElementStates.Changing}
                  letter={item.extraCircle?.item}
                  isSmall={true}
                />
              )}
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
