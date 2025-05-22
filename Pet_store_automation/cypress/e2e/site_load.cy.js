describe('Verificar se o site foi carregado', () => {
    beforeEach(() => {

        cy.visit(Cypress.env('diretorio'));
    });
  
    it('Deve carregar o site', () => {

      cy.url().should('include', Cypress.env('diretorio')); 
      cy.get('body').should('be.visible'); 
      cy.title().should('not.be.empty'); 
    });
  });
  