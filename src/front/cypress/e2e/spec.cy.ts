describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Connexion')
    cy.contains('Inscription')
    cy.contains('Vous n\'avez pas de compte??')
  })

  it('login with wrong credentials should return an error', () =>{
    cy.visit('/')

  });
})
