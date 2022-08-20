describe('приложение запущено', (() => {
    it('приложение доступно по адресу localhost:3000', () => {
        cy.visit('http://localhost:3000');
    });
}));