import { Button } from "./button";
import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, screen } from "@testing-library/react";

describe("Проверка рендера кнопки", () => {
  it("Кнопка с текстом рендерится без ошибок", () => {
    const button = renderer.create(<Button text="Sample text" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Кнопка без текста рендерится без ошибок", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Заблокированная кнопка рендерится без ошибок", () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Кнопка в состоянии загрузки рендерится без ошибок", () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });
});

it("У кнопки корректно срабатывает коллбэк", () => {
  window.alert = jest.fn();
  render(<Button text="button" onClick={alert("Test alert")} />);
  const button = screen.getByText("button");
  fireEvent.click(button);
  expect(window.alert).toHaveBeenCalledWith("Test alert");
});
