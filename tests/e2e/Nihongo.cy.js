describe('Japanese locale', () => {
  it('日本語テスト', () => {
    cy.visit('https://iqnet.co.jp')
    cy.screenshot()
    cy.get('section.footer')
      .should('contain', '株式会社インタークエスト')
  })
})
