describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.screenshot()
    cy.get('footer')
      .should('contain', 'Laravel vinvalid')
      .should('contain', 'PHP v8')
  })
})
