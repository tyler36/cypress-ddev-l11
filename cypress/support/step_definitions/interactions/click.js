import { When } from '@badeball/cypress-cucumber-preprocessor'

When('I click {string}', cy.clickSelector)
When('{string}をクリックします', cy.clickSelector)

When('I click the text {string}', cy.clickText)
When('テキスト{string}をクリックします', cy.clickText)
When('I click the text {string} in {string}', cy.clickTextIn)

When('I check {string}', cy.checkSelector)
When('I select {string} in {string}', cy.selectOption)

When('I submit the form', cy.submit)
When('フォームを送信します', cy.submit)
