// CREATE.CY.JS

describe('The user can CREATE a post!', () => {
  beforeEach(() => {
    cy.visit('./');
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
  });

  it('Here it checks if there is a TITLE!', () => {
    cy.wait(1000);
    cy.get('#footerActions .btn-outline-success')
      .should('have.text', 'Created a new Post!')
      .click();
    cy.wait(2000);
    cy.get('#postTitle').should('be.visible');
    cy.get('#postTags').should('be.visible').type('Just a cypress tag');
    cy.get('#postMedia')
      .should('be.visible')
      .type(
        'https://hips.hearstapps.com/hmg-prod/images/2022-lamborghini-huracan-tecnica-101-1657303967.jpg?crop=0.700xw:0.790xh;0.0717xw,0.183xh&resize=640:*'
      );
    cy.get('#postBody')
      .should('be.visible')
      .type('Here is the body, nothing special', { force: true });
    cy.wait(1000);
    cy.get("span[data-action='publish']")
      .should('be.visible')
      .click({ force: true });
    cy.get('#postTitle:invalid').should('have.length', 1);
    cy.get('#postTitle').then(($input) => {
      expect($input[0].validationMessage).to.eq(
        'Error, please fill in this field, thanks!'
      );
    });
  });

  it('Here it checks if the image url is VALID!', () => {
    cy.wait(1000);
    cy.get('#footerActions .btn-outline-success')
      .should('have.text', 'New Post')
      .click();
    cy.wait(2000);
    cy.get('#postTitle').should('be.visible').type('Here we have a url test!');
    cy.get('#postTags').should('be.visible');
    cy.get('#postMedia').should('be.visible').type('Not a URL!');
    cy.get('#postBody').should('be.visible');
    cy.wait(1000);
    cy.get("span[data-action='publish']")
      .should('be.visible')
      .click({ force: true });
    cy.get('#postMedia:invalid').should('have.length', 1);
    cy.get('#postMedia').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please enter a URL!');
    });
  });

  it('The user can CREATE a post!', () => {
    cy.wait(1000);
    cy.get('#footerActions .btn-outline-success')
      .should('have.text', 'New Post')
      .click();
    cy.wait(2000);
    cy.get('#postTitle')
      .should('be.visible')
      .type('Just a cypress title, relax!');
    cy.get('#postTags').should('be.visible').type('Just a cypress tag, relax!');
    cy.get('#postMedia')
      .should('be.visible')
      .type(
        'https://hips.hearstapps.com/hmg-prod/images/2022-lamborghini-huracan-tecnica-101-1657303967.jpg?crop=0.700xw:0.790xh;0.0717xw,0.183xh&resize=640:*'
      );
    cy.get('#postBody').type('ORANGE LAMBORGHINI', { force: true });
    cy.wait(1000);
    cy.get("span[data-action='publish']")
      .should('be.visible')
      .click({ force: true });
  });
});
