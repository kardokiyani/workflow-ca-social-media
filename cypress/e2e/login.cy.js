// LOGIN.CY.JS

describe('Authentication-User', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('Logging into social media application', () => {
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
    cy.wait(1200);
    cy.then(() => expect(window.localStorage.getItem('token')).to.not.be.null);
    cy.then(
      () => expect(window.localStorage.getItem('profile')).to.not.be.null
    );
    cy.url().should('include', 'profile');
  });

  it('Validates user EMAIL input based on API restrictions', () => {
    cy.visit('/');
    cy.wait(800);
    cy.get('.btn-close:visible').click();
    cy.wait(800);
    cy.get("button[data-auth='login']:visible").click();
    cy.wait(800);
    cy.get("input[type='email']:visible")
      .should('exist')
      .type(`kardo@noroff.no`);
    cy.get("input[type='password']:visible")
      .should('exist')
      .type(`kardokiyani1998`);
    cy.get('.btn-success:visible').click();
    cy.wait(1200);
    cy.then(() => expect(window.localStorage.getItem('token')).to.be.null);
    cy.then(() => expect(window.localStorage.getItem('profile')).to.be.null);
    cy.url().should('not.include', 'profile');
  });

  it('Validates user PASSWORD input based on API restrictions', () => {
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
      .type(`kardokiyani1998`);
    cy.get('.btn-success:visible').click();
    cy.wait(1200);
    cy.then(() => expect(window.localStorage.getItem('token')).to.be.null);
    cy.then(() => expect(window.localStorage.getItem('profile')).to.be.null);
    cy.url().should('not.include', 'profile');
  });

  it('Return INVALID password/email message for wrong password', () => {
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
      .type(`kardokiyani199`);
    cy.get('.btn-success:visible').click();
    cy.wait(1200);
    cy.then(() => expect(window.localStorage.getItem('token')).to.be.null);
    cy.then(() => expect(window.localStorage.getItem('profile')).to.be.null);
    cy.url().should('not.include', 'profile');
  });
});
