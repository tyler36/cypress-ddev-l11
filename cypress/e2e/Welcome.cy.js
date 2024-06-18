describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.screenshot()
    cy.get('footer')
      .should('contain', 'Laravel v11.5.0')
      .should('contain', 'PHP v8.2.20')
  })
})
