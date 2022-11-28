// LOG-OUT.CY.JS

describe('The user can LOG OUT of the site!', () => {
  beforeEach(() => {
    cy.visit('./');
    cy.clearLocalStorage();
  });

  it('The user can log out!', () => {
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
    cy.wait(1000);
    cy.get("button[data-auth='logout']").should('be.visible').click();
    cy.then(() => {
      expect(window.localStorage.getItem('token')).to.be.null;
    });
  });
});
