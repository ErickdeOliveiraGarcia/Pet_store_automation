

describe('Criar conta e realizar login via API', () => {

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllSessionStorage();
  });

  it('Deve criar um usuário e fazer login com sucesso', () => {
    
    cy.createUser().then((user) => {  
      cy.log('Usuário salvo:', user.username, user.password);

      cy.loginUser(user.username, user.password).then((response) =>{
        expect(response.status).to.eq(200); 
    })
  })
});

it('Tentativa de criar usuário sem nome', () => {
  cy.createUser('').then((user) => {  
    cy.log('Usuário:', user.username, user.password);
    cy.log('Response:', user.response); 

    expect(user.response.status).to.eq(500); 

  });
});

});
