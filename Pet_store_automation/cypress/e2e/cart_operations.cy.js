describe('Adicionar Produto ao Carrinho', () => {
    beforeEach(() => {
    cy.visit(Cypress.env('diretorio'));
    });
  
    it('Deve adicionar o produto Angelfish ao carrinho e validar', () => {
        cy.get(`#QuickLinks a[href*="categoryId=FISH"]`).click(); 
        cy.get('#Catalog a[href*="productId=FI-SW-01"]').click(); 
        cy.get('#Catalog a.Button').contains('Add to Cart').click();
    
        cy.get('a[href*="Cart.action"] img[name="img_cart"]').click();
        cy.url().should('include', 'Cart.action'); 

        cy.get('#Cart td').contains('FI-SW-01').should('be.visible'); 
        cy.get('#Cart input[name="EST-1"]').should('have.value', '1'); 


    });
    });
    