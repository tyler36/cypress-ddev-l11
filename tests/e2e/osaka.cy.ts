describe('Osaka test', () => {
  it('大阪を検索します', () => {
    cy.visit('https://duckduckgo.com')
    cy.get('[name="q"]').type('Osaka')
    cy.get('button[type="submit"]').click()

    cy.contains('大阪')
  })
})
