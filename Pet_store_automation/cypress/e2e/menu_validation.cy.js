
  describe('Validação do menu superior', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('diretorio'));
    });
  
    const validarCategoria = (categoria) => {
      cy.get(`#QuickLinks a[href*="categoryId=${categoria}"]`).should('be.visible');
    };
  
    it('Deve exibir as categorias do menu superior', () => {
      const categorias = ['FISH', 'DOGS', 'REPTILES', 'CATS', 'BIRDS'];
      categorias.forEach(validarCategoria);
    });
  });
  
