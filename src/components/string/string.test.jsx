import { swapString } from "./utils";

describe("Проверка разворота строки с четным числом символов", () => {
  let testString = "HEAD";

  it("верно возвращает конечный результат", () => {
    expect(swapString(testString).resultArray.join("")).toBe("DAEH");
  });

  it("верно возвращает результат на 2 шаге", () => {
    expect(swapString(testString, 1).resultArray.join("")).toBe("DEAH");
  });

  it("верно возвращает результат на 3 шаге", () => {
    expect(swapString(testString, 2).resultArray.join("")).toBe("DAEH");
  });
});

describe("Проверка разворота строки с нечетным числом символов", () => {
  let testString = "LIGHT";

  it("верно возвращает конечный результат", () => {
    expect(swapString(testString).resultArray.join("")).toBe("THGIL");
  });

  it("верно возвращает результат на 2 шаге", () => {
    expect(swapString(testString, 1).resultArray.join("")).toBe("TIGHL");
  });

  it("верно возвращает результат на 3 шаге", () => {
    expect(swapString(testString, 2).resultArray.join("")).toBe("THGIL");
  });
});

describe("Проверка разворота строки с одним символом", () => {
  let testString = "B";

  it("верно возвращает конечный результат", () => {
    expect(swapString(testString).resultArray.join("")).toBe("B");
  });

  it("верно возвращает результат на 2 шаге", () => {
    expect(swapString(testString, 1).resultArray.join("")).toBe("B");
  });
});

describe("Проверка разворота пустой строки", () => {
  let testString = "";

  it("верно возвращает конечный результат", () => {
    expect(swapString(testString).resultArray.join("")).toBe("");
  });
});