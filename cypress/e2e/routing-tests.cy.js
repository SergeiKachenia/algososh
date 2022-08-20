describe('роутинг в приложении работает правильно', () => {
    before(() => {
        cy.visit('http://localhost:3000');
    });

    it('по умолчанию открывает стартовую страницу', () => {
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('открывает страницу строки после клика', () => {
        cy.get('a[href*="/recursion"]').click();
        cy.contains('Строка');
    });

    it('открывает страницу Фибоначчи после возврата на главную и клика', () => {
        cy.get('button').contains('К оглавлению').click();
        cy.get('a[href*="/fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи');
    });

    it('открывает страницу сортировки после возврата на главную и клика', () => {
        cy.get('button').contains('К оглавлению').click();
        cy.get('a[href*="/sorting"]').click();
        cy.contains('Сортировка массива');
    });

    it('открывает страницу стека после возврата на главную и клика', () => {
        cy.get('button').contains('К оглавлению').click();
        cy.get('a[href*="/stack"]').click();
        cy.contains('Стек');
    });

    it('открывает страницу очереди после возврата на главную и клика', () => {
        cy.get('button').contains('К оглавлению').click();
        cy.get('a[href*="/queue"]').click();
        cy.contains('Очередь');
    });

    it('открывает страницу списка после возврата на главную и клика', () => {
        cy.get('button').contains('К оглавлению').click();
        cy.get('a[href*="/list"]').click();
        cy.contains('Связный список');
    });

    it('правильно выходит на главную в конце', () => {
        cy.get('button').contains('К оглавлению').click();
        cy.contains('МБОУ АЛГОСОШ');
    });
});