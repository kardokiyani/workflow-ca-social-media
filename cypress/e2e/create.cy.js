// CREATE.CY.JS

describe('Creating a post', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
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
    cy.visit('/');
  });

  it('The user can create a post', () => {
    cy.wait(800);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(1200);
    cy.url().should('include', 'post');
    cy.get('#post-title').should('exist').type('Cypress Testing Posts');
    cy.get('#post-tags').should('exist').type('Cypress, Testing, End To End');
    cy.get('#post-media')
      .should('exist')
      .type(
        'https://img.theculturetrip.com/472x265/smart/wp-content/uploads/2020/11/santorini.jpg'
      );
    cy.get('#post-body')
      .should('exist')
      .type('This post has been made with the help of using Cypress');
    cy.get('button[data-action="submit"]').click();
    cy.wait(4000);
    cy.url().should('include', 'view=post&postId=');
    cy.wait(800);
    cy.get('button[data-action="delete"]:visible').click();
    cy.wait(800);
    cy.url().should('include', '/');
  });

  it('Can validate inputs, require inputs and return validation messages', () => {
    cy.wait(800);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(1200);
    cy.url().should('include', 'post');
    cy.get('button[data-action="submit"]').click();
    cy.get('#post-title:invalid')
      .invoke('prop', 'validationMessage')
      .should('exist');
    cy.wait(300);
    cy.get('#post-title').should('exist').type('Cypress-Testing-Posts');
    cy.get('#post-media').should('exist').type('Not a URL');
    cy.get('button[data-action="submit"]').click();
    cy.get('#post-media:invalid')
      .invoke('prop', 'validationMessage')
      .should('exist');
    cy.wait(300);
    cy.get('#post-title').should('exist').clear();
    cy.get('#post-media').should('exist').clear();
    cy.get('#post-tags').should('exist').type('Cypress, Testing, End To End');
    cy.get('#post-media')
      .should('exist')
      .type(
        'https://img.theculturetrip.com/472x265/smart/wp-content/uploads/2020/11/santorini.jpg'
      );
    cy.get('#post-body')
      .should('exist')
      .type('This post has been made with the help of using Cypress');
    cy.get('button[data-action="submit"]').click();
    cy.get('#post-title:invalid')
      .invoke('prop', 'validationMessage')
      .should('exist');
  });

  it('Takes care of the thrown errors', () => {
    cy.wait(600);
    cy.get('a[href="/?view=post"]').click();
    cy.wait(1200);
    cy.url().should('include', 'post');
    cy.get('#post-title').should('exist').type('Cypress Testing Posts');
    cy.clearLocalStorage();
    cy.get('button[data-action="submit"]').click();
    cy.wait(1200);
    cy.url().should('include', '/');
  });
});
