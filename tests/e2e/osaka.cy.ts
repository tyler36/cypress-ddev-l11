describe('Osaka test', () => {
  it('can search for Osaka', () => {
    cy.visit('https://duckduckgo.com')
    cy.get('#searchbox_input').type('Osaka')
    cy.get('button[type="submit"]').click()

    cy.contains('大阪')
  })
})
