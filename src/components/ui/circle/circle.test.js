import { Circle } from "./circle";
import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { ElementStates } from "../../../types/element-states";

describe("Проверка рендера кружка", () => {
  describe("Рендер с буквами и без букв", () => {
    it("Кружок без буквы рендерится без ошибок", () => {
      const circle = renderer.create(<Circle />).toJSON();
      expect(circle).toMatchSnapshot();
    });

    it("Кружок c буквами рендерится без ошибок", () => {
      const circle = renderer.create(<Circle letter="TEST" />).toJSON();
      expect(circle).toMatchSnapshot();
    });
  });
  describe("Кружок рендерится с head", () => {
    it("Кружок cо строкой в head рендерится без ошибок", () => {
      const circle = renderer.create(<Circle head={"test"} />).toJSON();
      expect(circle).toMatchSnapshot();
    });
    it("Кружок c node в head рендерится без ошибок", () => {
      const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
      expect(circle).toMatchSnapshot();
    });
  });
  describe("Кружок рендеритcя с tail", () => {
    it("Кружок cо строкой в tail рендерится без ошибок", () => {
      const circle = renderer.create(<Circle tail={"test"} />).toJSON();
      expect(circle).toMatchSnapshot();
    });
    it("Кружок c node в tail рендерится без ошибок", () => {
      const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
      expect(circle).toMatchSnapshot();
    });
  });
  describe("Кружок рендерится в разных состояниях", () => {
    it("Кружок в состоянии default рендерится без ошибок", () => {
      const circle = renderer
        .create(<Circle state={ElementStates.Default} />)
        .toJSON();
      expect(circle).toMatchSnapshot();
    });
    it("Кружок в состоянии changing рендерится без ошибок", () => {
      const circle = renderer
        .create(<Circle state={ElementStates.Changing} />)
        .toJSON();
      expect(circle).toMatchSnapshot();
    });
    it("Кружок в состоянии modified рендерится без ошибок", () => {
      const circle = renderer
        .create(<Circle state={ElementStates.Modified} />)
        .toJSON();
      expect(circle).toMatchSnapshot();
    });
    it("Кружок в состоянии chosen рендерится без ошибок", () => {
      const circle = renderer
        .create(<Circle state={ElementStates.Chosen} />)
        .toJSON();
      expect(circle).toMatchSnapshot();
    });
  });
  it("Кружок с индексом рендерится без ошибок", () => {
    const circle = renderer.create(<Circle index={1} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Кружок с пропcом isSmall рендерится без ошибок", () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
