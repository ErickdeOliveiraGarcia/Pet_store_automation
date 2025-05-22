describe('Pesquisa por Produto', () => {
    beforeEach(() => {
    cy.visit(Cypress.env('diretorio'));
    });
  
    it('Deve realizar uma pesquisa por fish e exibir resultados', () => {
        cy.get('[size="14"]') 
        .type('fish{enter}'); 
  
        cy.get('#Catalog table th') 
        .contains('Product ID') 

    
        cy.get('#Catalog a[href*="productId="]')
          .should('be.visible') 
          .and('contain.text', 'Fresh Water fish from China'); 

          cy.get('#Catalog a[href*="productId="]')
          .should('be.visible') 
          .and('contain.text', 'Salt Water fish from Australia'); 
    });
  });