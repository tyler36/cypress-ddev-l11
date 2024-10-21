import { Given, When } from '@badeball/cypress-cucumber-preprocessor'
import { stringToJson } from '../../helpers/convert'

beforeEach(function () {
  cy.fixture('user').then((data) => {
    this.monster = data
  })
})

let loginAs = (data) => cy.login(stringToJson(data)).as('User')

When('I login {string}', loginAs)
When('I logout', cy.logout)
Given('I log data', function () {
  cy.log(this.Portal)
})
