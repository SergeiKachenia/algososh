describe("Тесты страницы связного списка", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/list");
    });

    describe("Проверка состояний кнопок", () => {
        it("Кнопки добавления/удаления верно меняют значение атрибута disabled", () => {
            cy.contains("Добавить в head").should("be.disabled");
            cy.contains("Добавить в tail").should("be.disabled");
            cy.contains("Удалить из head").should("not.be.disabled");
            cy.contains("Удалить из tail").should("not.be.disabled");
            cy.get('input[name="value"]').type("123");
            cy.contains("Добавить в head").should("not.be.disabled");
            cy.contains("Добавить в tail").should("not.be.disabled");
            cy.contains("Удалить из head").should("not.be.disabled");
            cy.contains("Удалить из tail").should("not.be.disabled");
            cy.get('input[name="value"]').clear();
            cy.contains("Добавить в head").should("be.disabled");
            cy.contains("Добавить в tail").should("be.disabled");
            cy.contains("Удалить из head").should("not.be.disabled");
            cy.contains("Удалить из tail").should("not.be.disabled");
        });

        it("Кнопки добавления/удаления по индексу верно меняют значение атрибута disabled", () => {
            cy.contains("Добавить по индексу").should("be.disabled");
            cy.contains("Удалить по индексу").should("be.disabled");
            cy.get('input[name="value"]').type("123");
            cy.get('input[name="index"]').type("3");
            cy.contains("Добавить по индексу").should("not.be.disabled");
            cy.contains("Удалить по индексу").should("not.be.disabled");
            cy.get('input[name="value"]').clear();
            cy.get('input[name="index"]').clear();
            cy.contains("Добавить по индексу").should("be.disabled");
            cy.contains("Удалить по индексу").should("be.disabled");
        });
    });

    describe("Проверка работы анимации изменения связного списка", () => {
        it("При открытии страницы виден дефолтный список", () => {
            cy.get("[class*=circle_content]")
                .should("have.length", 6)
                .each((el, index) => {
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                    if (index === 0) {
                        expect(el).to.contain("head");
                    }
                    if (index === 5) {
                        expect(el).to.contain("tail");
                    }
                });
        });

        it("Правильно добавляется элемент в head", () => {
            cy.get('input[name="value"]').type("123");
            cy.contains("Добавить в head").click();

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    cy.wrap(el)
                        .siblings()
                        .find("[class*=circle_small]")
                        .should("have.css", "border", "4px solid rgb(210, 82, 225)")
                        .should("have.text", "123");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(127, 224, 81)")
                        .should("have.text", "123");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    expect(el).to.contain("head");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)")
                        .should("have.text", "123");
                }
            });
        });

        it("Правильно добавляется элемент в tail", () => {
            cy.get('input[name="value"]').type("123");
            cy.contains("Добавить в tail").click();

            for (let i = 0; i <= 6; i++) {
                cy.get("[class*=circle_content]").each((el, index) => {
                    let currentIdx = i;
                    if (index < currentIdx)
                        cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
                    if (index === currentIdx) {
                        cy.wrap(el)
                            .siblings()
                            .find("[class*=circle_small]")
                            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
                            .should("have.text", "123");
                    }
                });

                cy.wait(500);
            }

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 6) {
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(127, 224, 81)")
                        .should("have.text", "123");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 6) {
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)")
                        .should("have.text", "123");
                    expect(el).to.contain("tail");
                }
            });
        });

        it("Правильно удаляется элемент из head", () => {
            cy.contains("Удалить из head").click();

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    cy.wrap(el)
                        .siblings()
                        .find("[class*=circle_small]")
                        .should("have.css", "border", "4px solid rgb(210, 82, 225)")
                        .should("not.have.text", "");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 0) {
                    expect(el).to.contain("head");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
            });
        });

        it("Правильно удаляется элемент из tail", () => {
            cy.contains("Удалить из tail").click();

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 5) {
                    cy.wrap(el)
                        .siblings()
                        .find("[class*=circle_small]")
                        .should("have.css", "border", "4px solid rgb(210, 82, 225)")
                        .should("not.have.text", "");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 5) {
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 5) {
                    expect(el).to.contain("tail");
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
                }
            });
        });

        it("Правильно добавляется элемент по индексу", () => {
            cy.get('input[name="value"]').type("123");
            cy.get('input[name="index"]').type("2");
            cy.contains("Добавить по индексу").click();

            for (let i = 0; i <= 2; i++) {
                cy.get("[class*=circle_content]").each((el, index) => {
                    let currentIndex = i;
                    if (index < currentIndex)
                        cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
                    if (index === currentIndex) {
                        cy.wrap(el)
                            .siblings()
                            .find("[class*=circle_small]")
                            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
                            .should("have.text", "123");
                    }
                });

                cy.wait(500);
            }

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 2) {
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(127, 224, 81)")
                        .should("have.text", "123");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 2) {
                    cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(0, 50, 255)")
                        .should("have.text", "123");
                    expect(el).to.contain("2");
                }
            });
        });

        it("Правильно удаляется элемент по индексу", () => {
            cy.get('input[name="value"]').type("123");
            cy.get('input[name="index"]').type("2");
            cy.contains("Удалить по индексу").click();

            for (let i = 0; i <= 2; i++) {
                cy.get("[class*=circle_content]").each((el, index) => {
                    let currentIndex = i;
                    if (index <= currentIndex)
                        cy.wrap(el)
                        .find("[class*=circle_circle]")
                        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
                });
                cy.wait(500);
            }
            cy.get("[class*=circle_content]").each((el, index) => {
                if (index === 2) {
                    cy.wrap(el)
                        .siblings()
                        .find("[class*=circle_small]")
                        .should("have.css", "border", "4px solid rgb(210, 82, 225)")
                        .should("not.have.text", "");
                }
            });

            cy.wait(500);

            cy.get("[class*=circle_content]").each((el) => {
                cy.wrap(el)
                    .find("[class*=circle_circle]")
                    .should("have.css", "border", "4px solid rgb(0, 50, 255)");
            });
        });
    });
});