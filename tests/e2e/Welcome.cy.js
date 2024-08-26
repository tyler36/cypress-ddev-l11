describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.screenshot()
    cy.get('footer')
      .should('contain', 'Laravel v11')
      .should('contain', 'PHP v8')
  })
})
