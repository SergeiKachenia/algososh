describe("Тесты страницы очереди", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/queue");
    });

    describe("Проверка состояния кнопки", () => {
        it("Кнопка верно меняет значение атрибута disabled", () => {
            cy.contains("Добавить").as("button");
            cy.get("@button").should("be.disabled");
            cy.get("input").type("123");
            cy.get("@button").should("not.be.disabled");
            cy.get("input").clear();
            cy.get("@button").should("be.disabled");
        });
    });

    describe("Проверка работы анимации изменения очереди", () => {
        it("Правильно добавляет несколько элементов", () => {
            cy.get("input").type("one");
            cy.contains("Добавить").click();
            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    expect(el).to.contain("one");
                    expect(el).to.contain("0");
                    expect(el).to.contain("head");
                    expect(el).to.contain("tail");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
            });

            cy.wait(500);

            cy.get("input").type("two");
            cy.contains("Добавить").click();
            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    expect(el).to.contain("one");
                    expect(el).to.contain("0");
                    expect(el).to.contain("head");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
                if (index === 1) {
                    expect(el).to.contain("two");
                    expect(el).to.contain("1");
                    expect(el).to.contain("tail");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    expect(el).to.contain("one");
                    expect(el).to.contain("0");
                    expect(el).to.contain("head");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
                if (index === 1) {
                    expect(el).to.contain("two");
                    expect(el).to.contain("1");
                    expect(el).to.contain("tail");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
            });
        });

        it("Правильно удаляет несколько элементов", () => {
            cy.get("input").type("one");
            cy.contains("Добавить").click();
            cy.get("input").type("two");
            cy.contains("Добавить").click();

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    expect(el).to.contain("one");
                    expect(el).to.contain("0");
                    expect(el).to.contain("head");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
                if (index === 1) {
                    expect(el).to.contain("two");
                    expect(el).to.contain("1");
                    expect(el).to.contain("tail");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
            });

            cy.contains("Удалить").click();
            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    expect(el).to.not.contain("one");
                    expect(el).to.contain("0");
                    expect(el).to.not.contain("head");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
                if (index === 1) {
                    expect(el).to.contain("two");
                    expect(el).to.contain("1");
                    expect(el).to.contain("head");
                    expect(el).to.contain("tail");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    expect(el).to.not.contain("one");
                    expect(el).to.contain("0");
                    expect(el).to.not.contain("head");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
                if (index === 1) {
                    expect(el).to.contain("two");
                    expect(el).to.contain("1");
                    expect(el).to.contain("head");
                    expect(el).to.contain("tail");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
            });

            cy.contains("Удалить").click();
            cy.get("[class*=circle_content]").each((el) => {
                expect(el).to.not.contain("two");
                expect(el).to.not.contain("one");
                expect(el).to.not.contain("head");
                expect(el).to.not.contain("tail");
                cy.wrap(el)
                    .find("[class*=circle_circle]")
                    .should("have.css", "border", "4px solid rgb(0, 50, 255)");
            });
        });

        it("Правильно работает кнопка 'очистить'", () => {
            cy.get("input").type("one");
            cy.contains("Добавить").click();
            cy.get("input").type("two");
            cy.contains("Добавить").click();
            cy.get("input").type("thre");
            cy.contains("Добавить").click();

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    expect(el).to.contain("one");
                    expect(el).to.contain("0");
                    expect(el).to.contain("head");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
                if (index === 1) {
                    expect(el).to.contain("two");
                    expect(el).to.contain("1");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
                if (index === 2) {
                    expect(el).to.contain("thre");
                    expect(el).to.contain("2");
                    expect(el).to.contain("tail");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
            });

            cy.contains("Очистить").click();
            cy.get("[class*=circle_content]").each((el) => {
                expect(el).to.not.contain("thre");
                expect(el).to.not.contain("two");
                expect(el).to.not.contain("one");
                expect(el).to.not.contain("head");
                expect(el).to.not.contain("tail");
                cy.wrap(el)
                    .find("[class*=circle_circle]")
                    .should("have.css", "border", "4px solid rgb(0, 50, 255)");
            });
        });
    });
});