// LOGIN.CY.JS

describe('The user can LOG IN to the site!', () => {
  beforeEach(() => {
    cy.visit('./');
    cy.clearLocalStorage();
  });

  it('This checks if the EMAIL the user has put in, are correct or not!', () => {
    cy.get('#registerModalLabel')
      .should('have.text', 'Create Profile')
      .should('be.visible');
    cy.wait(1000);
    cy.get('#registerForm')
      .find('.btn-outline-success')
      .should('be.visible')
      .click();
    cy.get('#loginModalLabel')
      .should('have.text', 'Login')
      .should('be.visible');
    const email = 'invalidEmail@noroff.no';
    cy.wait(1000);
    const password = '123456789';
    cy.get('#loginEmail').type(`${email}`);
    cy.get('#loginPassword').type(`${password}`);
    cy.wait(1000);
    cy.get('#loginForm .btn-success').should('be.visible').click();
    cy.wait(2000);
    cy.then(() => {
      expect(window.localStorage.getItem('token')).to.be.null;
    });
  });

  it('This checks if the PASSWORD the user has put in, are correct or not!', () => {
    cy.get('#registerModalLabel')
      .should('have.text', 'Create Profile')
      .should('be.visible');
    cy.wait(1000);
    cy.get('#registerForm')
      .find('.btn-outline-success')
      .should('be.visible')
      .click();
    cy.get('#loginModalLabel')
      .should('have.text', 'Login')
      .should('be.visible');
    const email = 'kardo@noroff.no';
    cy.wait(1000);
    const password = 'wrong-password123';
    cy.get('#loginEmail').type(`${email}`);
    cy.get('#loginPassword').type(`${password}`);
    cy.wait(1000);
    cy.get('#loginForm .btn-success').should('be.visible').click();
    cy.wait(2000);
    cy.then(() => {
      expect(window.localStorage.getItem('token')).to.be.null;
    });
  });

  it('Here the user CAN LOG IN!', () => {
    cy.get('#registerModalLabel')
      .should('have.text', 'Create Profile')
      .should('be.visible');
    cy.wait(1000);
    cy.get('#registerForm')
      .find('.btn-outline-success')
      .should('be.visible')
      .click();
    cy.get('#loginModalLabel')
      .should('have.text', 'Login')
      .should('be.visible');
    const email = 'kardo@noroff.no';
    cy.wait(1000);
    const password = 'kardokiyani1998';
    cy.get('#loginEmail').type(`${email}`);
    cy.get('#loginPassword').type(`${password}`);
    cy.wait(1000);
    cy.get('#loginForm .btn-success').should('be.visible').click();
    cy.wait(2000);
    cy.then(() => {
      expect(window.localStorage.getItem('token')).to.not.be.null;
    });
  });
});
