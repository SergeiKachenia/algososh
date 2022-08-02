import { ElementStates } from "../../types/element-states";
import { bubbleSortAlgo, selectionSortAlgo } from "./utils";

describe("Проверка алгоритма сортировки выбором", () => {
    let testArray;

    beforeEach(() => {
        testArray = [{
                num: 6,
                state: ElementStates.Default,
            },
            {
                num: 4,
                state: ElementStates.Default,
            },
            {
                num: 2,
                state: ElementStates.Default,
            },
            {
                num: 8,
                state: ElementStates.Default,
            },
            {
                num: 10,
                state: ElementStates.Default,
            },
        ];
    });

    it("верно возвращает конечный результат (по убыванию)", () => {
        const resultArr = [{
                num: 10,
                state: ElementStates.Modified,
            },
            {
                num: 8,
                state: ElementStates.Modified,
            },
            {
                num: 6,
                state: ElementStates.Modified,
            },
            {
                num: 4,
                state: ElementStates.Modified,
            },
            {
                num: 2,
                state: ElementStates.Modified,
            },
        ];
        expect(
            selectionSortAlgo("descending", testArray).resultArray
        ).toStrictEqual(resultArr);
    });
    it("верно возвращает конечный результат (по возрастанию)", () => {
        const resultArr = [{
                num: 2,
                state: ElementStates.Modified,
            },
            {
                num: 4,
                state: ElementStates.Modified,
            },
            {
                num: 6,
                state: ElementStates.Modified,
            },
            {
                num: 8,
                state: ElementStates.Modified,
            },
            {
                num: 10,
                state: ElementStates.Modified,
            },
        ];
        expect(selectionSortAlgo("ascending", testArray).resultArray).toStrictEqual(
            resultArr
        );
    });
    it("верно меняет стейты кружков и работает с шагом", () => {
        const resultArr = [{
                num: 6,
                state: ElementStates.Chosen,
            },
            {
                num: 4,
                state: ElementStates.Changing,
            },
            {
                num: 2,
                state: ElementStates.Default,
            },
            {
                num: 8,
                state: ElementStates.Default,
            },
            {
                num: 10,
                state: ElementStates.Default,
            },
        ];
        expect(
            selectionSortAlgo("descending", testArray, 2).resultArray
        ).toStrictEqual(resultArr);
    });
    it("верно работает с пустым массивом", () => {
        const resultArr = [];
        expect(selectionSortAlgo("descending", []).resultArray).toStrictEqual(
            resultArr
        );
    });
    it("верно работает с массивом из одного элемента", () => {
        const resultArr = [{
            num: 15,
            state: ElementStates.Modified,
        }, ];
        expect(
            selectionSortAlgo("descending", [{
                num: 15,
                state: ElementStates.Default,
            }, ]).resultArray
        ).toStrictEqual(resultArr);
    });
});

describe("Проверка алгоритма сортировки пузырьком", () => {
    let testArray;

    beforeEach(() => {
        testArray = [{
                num: 7,
                state: ElementStates.Default,
            },
            {
                num: 5,
                state: ElementStates.Default,
            },
            {
                num: 3,
                state: ElementStates.Default,
            },
            {
                num: 11,
                state: ElementStates.Default,
            },
            {
                num: 10,
                state: ElementStates.Default,
            },
        ];
    });

    it("верно возвращает конечный результат (по убыванию)", () => {
        const resultArr = [{
                num: 11,
                state: ElementStates.Modified,
            },
            {
                num: 10,
                state: ElementStates.Modified,
            },
            {
                num: 7,
                state: ElementStates.Modified,
            },
            {
                num: 5,
                state: ElementStates.Modified,
            },
            {
                num: 3,
                state: ElementStates.Modified,
            },
        ];
        expect(bubbleSortAlgo("descending", testArray).resultArray).toStrictEqual(
            resultArr
        );
    });
    it("верно возвращает конечный результат (по возрастанию)", () => {
        const resultArr = [{
                num: 3,
                state: ElementStates.Modified,
            },
            {
                num: 5,
                state: ElementStates.Modified,
            },
            {
                num: 7,
                state: ElementStates.Modified,
            },
            {
                num: 10,
                state: ElementStates.Modified,
            },
            {
                num: 11,
                state: ElementStates.Modified,
            },
        ];
        expect(bubbleSortAlgo("ascending", testArray).resultArray).toStrictEqual(
            resultArr
        );
    });
    it("верно меняет стейты кружков и работает с шагом", () => {
        const resultArr = [{
                num: 7,
                state: ElementStates.Default,
            },
            {
                num: 5,
                state: ElementStates.Changing,
            },
            {
                num: 3,
                state: ElementStates.Changing,
            },
            {
                num: 11,
                state: ElementStates.Default,
            },
            {
                num: 10,
                state: ElementStates.Default,
            },
        ];
        expect(
            bubbleSortAlgo("descending", testArray, 2).resultArray
        ).toStrictEqual(resultArr);
    });
    it("верно работает с пустым массивом", () => {
        const resultArr = [];
        expect(bubbleSortAlgo("descending", []).resultArray).toStrictEqual(
            resultArr
        );
    });
    it("верно работает с массивом из одного элемента", () => {
        const resultArr = [{
            num: 15,
            state: ElementStates.Modified,
        }, ];
        expect(
            bubbleSortAlgo("descending", [{
                num: 15,
                state: ElementStates.Default,
            }, ]).resultArray
        ).toStrictEqual(resultArr);
    });
});