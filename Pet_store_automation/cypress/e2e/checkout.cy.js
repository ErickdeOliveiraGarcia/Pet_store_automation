describe('Compra via API', () => {
  let sessionCookie;
  let createdUsername;
  let createdPassword;
  let productId = 'EST-1'//'FI-SW-01'
  let createdcardType;
  let createdcreditCard;
  let createdexpiryDate;
  let createdbillToFirstName;
  let createdbillToLastName;
  let createdbillAddress1;
  let createdbillAddress2;
  let createdbillCity;
  let createdbillState;
  let createdbillZip;
  let createdbillCountry;
  let creatednewOrder;

  before(() => {
    //Criar um usuário antes de iniciar os testes de compra
    cy.createUser().then((user) => {
      createdUsername = user.username;
      createdPassword = user.password;
      createdcardType = 'Visa'
      createdcreditCard = '9999 9999 9999 9999'
      createdexpiryDate = '12/03'
      createdbillToFirstName = user.firstName
      createdbillToLastName = user.lastName
      createdbillAddress1 = user.address1
      createdbillAddress2 = user.address2
      createdbillCity = user.city
      createdbillState = user.state
      createdbillZip = user.zip
      createdbillCountry = user.country
      creatednewOrder = 'Continue'

      
      //Realiza o login e armazena o cookie de sessão corretamente
      cy.loginUser(createdUsername, createdPassword).then((response) => {

        sessionCookie = response.requestHeaders.cookie;
        Cypress.env('sessionCookie', sessionCookie);
      });
    });
  });

  beforeEach(() => {
    //Aplica o cookie de sessão antes de cada teste
    cy.setCookie('JSESSIONID', Cypress.env('sessionCookie'));
  });

  it('Deve adicionar um produto ao carrinho', () => {
    cy.request({
      method: 'GET',
      url: Cypress.config('baseUrl') + `/jpetstore/actions/Cart.action?addItemToCart=&workingItemId=${productId}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: sessionCookie
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Deve remover um produto do carrinho', () => {
    cy.request({
      method: 'GET',
      url: Cypress.config('baseUrl') + `/jpetstore/actions/Cart.action?removeItemFromCart=&workingItemId=${productId}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: sessionCookie
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Deve abrir um pedido', () => {
    cy.request({
      method: 'GET',
      url: Cypress.config('baseUrl') + '/jpetstore/actions/Order.action?newOrderForm=',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: sessionCookie
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Deve confirmar um pedido', () => {
    const orderData = new URLSearchParams();
    orderData.append('order.cardType', createdcardType);
    orderData.append('order.creditCard', createdcreditCard);
    orderData.append('order.expiryDate', createdexpiryDate);
    orderData.append('order.billToFirstName', createdbillToFirstName);
    orderData.append('order.billToLastName', createdbillToLastName);
    orderData.append('order.billAddress1', createdbillAddress1);
    orderData.append('order.billAddress2', createdbillAddress2);
    orderData.append('order.billCity', createdbillCity);
    orderData.append('order.billState', createdbillState);
    orderData.append('order.billZip', createdbillZip);
    orderData.append('order.billCountry', createdbillCountry);
    orderData.append('newOrder', creatednewOrder);
    orderData.append('_sourcePage', '');  
    orderData.append('_fp', '');  
  
    cy.request({
      method: 'POST',
      url: Cypress.config('baseUrl') + '/jpetstore/actions/Order.action',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: sessionCookie
      },
      body: orderData.toString()
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Deve confirmar o pagamento', () => {
    cy.request({
      method: 'POST',
      url: Cypress.config('baseUrl') + '/jpetstore/actions/Order.action?newOrder=&confirmed=true',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: sessionCookie
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
