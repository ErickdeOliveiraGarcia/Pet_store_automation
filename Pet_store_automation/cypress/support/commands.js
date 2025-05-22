import { faker } from '@faker-js/faker';

Cypress.Commands.add('createUser', (username = faker.internet.username(), password = faker.internet.password(), repeatedPassword = password) => {
const apiUrl = Cypress.config('baseUrl') + '/jpetstore/actions/Account.action';
  
  //Gera dados do usuário dinamicamente
  const userData = {
    username,
    password,
    repeatedPassword,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    country: faker.location.country()
  };

  //Monta body com URLSearchParams
  const body = new URLSearchParams();
  body.append('username', userData.username);
  body.append('password', userData.password);
  body.append('repeatedPassword', userData.repeatedPassword);
  body.append('account.firstName', userData.firstName);
  body.append('account.lastName', userData.lastName);
  body.append('account.email', userData.email);
  body.append('account.phone', userData.phone);
  body.append('account.address1', userData.address1);
  body.append('account.address2', userData.address2);
  body.append('account.city', userData.city);
  body.append('account.state', userData.state);
  body.append('account.zip', userData.zip);
  body.append('account.country', userData.country);
  body.append('account.languagePreference', 'english');
  body.append('account.favouriteCategoryId', 'FISH');
  body.append('account.listOption', 'true');
  body.append('account.bannerOption', 'true');
  body.append('newAccount', '');
  body.append('_sourcePage', '');
  body.append('_fp', '');

  return cy.request({
    method: 'POST',
    url: apiUrl,
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': Cypress.config('baseUrl') + '/jpetstore/actions/Account.action?newAccountForm=',
      'Origin': Cypress.config('baseUrl'),
    },
    body: body.toString()
  }).then((response) => {
    //Armazena os dados do usuário no cypress.env
    Cypress.env('createdUser', userData);
    userData.response = response;

    return cy.wrap(userData)
  });
});

Cypress.Commands.add('loginUser', (username, password) => {
    const apiUrl = Cypress.config('baseUrl') + '/jpetstore/actions/Account.action';
  
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);
    body.append('signon', 'Login');
    body.append('_sourcePage', '');  
    body.append('_fp', '');  

    cy.log('Realizando login com:', { username, password });

    return cy.request({
        method: 'POST',
        url: apiUrl,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': Cypress.config('baseUrl') + '/jpetstore/actions/Account.action',
            'Origin': Cypress.config('baseUrl'),
        },
        body: body.toString(),
        failOnStatusCode: false 
    }).then((response) => {

        return cy.wrap(response);
    });
});
