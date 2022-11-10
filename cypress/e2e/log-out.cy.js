// LOG-OUT.CY.JS

const baseURL = 'http://127.0.0.1:5500/';
describe('Log-out', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('The user can log out', () => {
    cy.visit('/');
    cy.wait(800);
    cy.get('.btn-close:visible').click();
    cy.wait(800);
    cy.get("button[data-auth='login']:visible").click();
    cy.wait(800);
    cy.get("input[type='email']:visible")
      .should('exist')
      .type(Cypress.env('kardo@noroff.no'));
    cy.get("input[type='password']:visible")
      .should('exist')
      .type(Cypress.env('kardokiyani1998'));
    cy.get('.btn-success:visible').click();
    cy.wait(2000);
    cy.then(() => expect(window.localStorage.getItem('token')).to.not.be.null);
    cy.then(
      () => expect(window.localStorage.getItem('profile')).to.not.be.null
    );
    cy.get("button[data-auth='logout']").click();
    cy.url().should('not.include', 'profile');
    cy.then(() => expect(window.localStorage.getItem('token')).to.be.null);
    cy.then(() => expect(window.localStorage.getItem('profile')).to.be.null);
  });
});
