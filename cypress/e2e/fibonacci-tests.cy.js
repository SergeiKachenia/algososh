describe("Тесты страницы вывода последовательности Фибоначчи", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/fibonacci");
    });

    describe("Проверка состояния кнопки", () => {
        it("Кнопка верно меняет значение атрибута disabled", () => {
            cy.contains("Развернуть").as("button");
            cy.get("@button").should("be.disabled");
            cy.get("input").type("11");
            cy.get("@button").should("not.be.disabled");
            cy.get("input").clear();
            cy.get("@button").should("be.disabled");
        });
    });

    describe("Проверка работы анимации последовательности Фибоначчи", () => {
        it("Правильно выводит последовательность Фибоначчи", () => {
            cy.get("input").type("5");
            cy.contains("Развернуть").click();
            cy.get("[class*=circle_circle]")
                .should("have.length", 1)
                .each((el, index) => {
                    if (index === 0) expect(el).to.contain("1");
                });

            cy.wait(500);

            cy.get("[class*=circle_circle]")
                .should("have.length", 2)
                .each((el, index) => {
                    if (index === 0) expect(el).to.contain("1");
                    if (index === 1) expect(el).to.contain("1");
                });

            cy.wait(500);

            cy.get("[class*=circle_circle]")
                .should("have.length", 3)
                .each((el, index) => {
                    if (index === 0) expect(el).to.contain("1");
                    if (index === 1) expect(el).to.contain("1");
                    if (index === 2) expect(el).to.contain("2");
                });

            cy.wait(500);

            cy.get("[class*=circle_circle]")
                .should("have.length", 4)
                .each((el, index) => {
                    if (index === 0) expect(el).to.contain("1");
                    if (index === 1) expect(el).to.contain("1");
                    if (index === 2) expect(el).to.contain("2");
                    if (index === 3) expect(el).to.contain("3");
                });

            cy.wait(500);

            cy.get("[class*=circle_circle]")
                .should("have.length", 5)
                .each((el, index) => {
                    if (index === 0) expect(el).to.contain("1");
                    if (index === 1) expect(el).to.contain("1");
                    if (index === 2) expect(el).to.contain("2");
                    if (index === 3) expect(el).to.contain("3");
                    if (index === 4) expect(el).to.contain("5");
                });

            cy.wait(500);

            cy.get("[class*=circle_circle]")
                .should("have.length", 6)
                .each((el, index) => {
                    if (index === 0) expect(el).to.contain("1");
                    if (index === 1) expect(el).to.contain("1");
                    if (index === 2) expect(el).to.contain("2");
                    if (index === 3) expect(el).to.contain("3");
                    if (index === 4) expect(el).to.contain("5");
                    if (index === 5) expect(el).to.contain("8");
                });
        });
    });
});