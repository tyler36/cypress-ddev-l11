import { message } from '../../../fixtures/selectors.json'

/**
 * Assert "selector" exists on page
 * @param {string} selector CSS selector
 */
let selectorExist = (selector) => cy.get(selector).should('exist')

/**
 * Assert "selector" does NOT exist on page
 * @param {string} selector CSS selector
 */
let selectorNotExist = (selector) => cy.get(selector).should('not.exist')

/**
 * Assert "selector" contains "text"
 * @param {string} selector
 * @param {string} text
 */
let selectorContainsString = (selector, text) =>
  cy.get(selector).should('contain', text)

/**
 * Assert "selector" does NOT contain "text"
 * @param {string} selector
 * @param {string} text
 */
let selectorNotContainsString = (selector, text) =>
  cy.get(selector).should('not.contain', text)

/**
 * Selector should have value set
 * @param {string} selector
 * @param {string} value
 */
let selectorContainsValue = (selector, value) =>
  cy.get(selector).should('have.value', value)

/**
 * Selector should NOT have value set. Opposite of "selectorContainsValue"
 * @param {string} selector
 * @param {string} value
 */
let selectorNotContainsValue = (selector, value) =>
  cy.get(selector).should('not.have.value', value)

/**
 * Assert "selector" is visible on page
 * @param {string} selector
 */
let selectorVisible = (selector) =>
  cy.get(selector).then(($el) => assert.isTrue(Cypress.dom.isVisible($el)))

/**
 * Assert "selector" is NOT visible on page
 * @param {string} selector
 */
let selectorHidden = (selector) =>
  cy.get(selector).then(($el) => assert.isTrue(Cypress.dom.isHidden($el)))

/**
 *Assert link to "path" exists
 * @param {string} uri  uri
 */
let linkExist = (uri) => cy.get(`a[href$="${uri}"]`).should('exist')

/**
 * Assert link to "path" does NOT exist
 * @param {string} uri uri
 */
let linkNotExist = (uri) => cy.get(`a[href$="${uri}"]`).should('not.exist')

/**
 * Assert page title contains text
 * @param {string} text
 */
let titleContains = (text) => cy.title().should('include', text)

/**
 * Assert page description is set to "text"
 * @param {string} text
 */
let metaDescription = (text) => metaName('description', text)

/**
 * Assert "name" meta-tag with has content set to "text"
 * @param {string} name attribute
 * @param {string} text
 */
let metaName = (name, text) =>
  cy.get(`meta[name="${name}"]`).should('have.attr', 'content', text)

/**
 * Assert "property" meta-tag with has content set to "text"
 * @param {string} property attribute
 * @param {string} text
 */
let metaProp = (property, text) =>
  cy.get(`meta[property="${property}"]`).should('have.attr', 'content', text)

/**
 * Assert script element with "scriptSrc" exists
 * @param {string} scriptSrc
 */
let scriptExist = (scriptSrc) => selectorExist(`script[src="${scriptSrc}"]`)

/**
 * "Error" selector does NOT exist on page. Alias
 */
let notSeeErrors = () => selectorNotExist(message.error)

Cypress.Commands.add('selectorExist', selectorExist)
Cypress.Commands.add('selectorNotExist', selectorNotExist)
Cypress.Commands.add('selectorContainsString', selectorContainsString)
Cypress.Commands.add('selectorNotContainsString', selectorNotContainsString)
Cypress.Commands.add('selectorContainsValue', selectorContainsValue)
Cypress.Commands.add('selectorNotContainsValue', selectorNotContainsValue)
Cypress.Commands.add('selectorVisible', selectorVisible)
Cypress.Commands.add('selectorHidden', selectorHidden)

Cypress.Commands.add('linkExist', linkExist)
Cypress.Commands.add('linkNotExist', linkNotExist)

Cypress.Commands.add('titleContains', titleContains)
Cypress.Commands.add('metaDescription', metaDescription)
Cypress.Commands.add('metaName', metaName)
Cypress.Commands.add('metaProp', metaProp)
Cypress.Commands.add('scriptExist', scriptExist)

Cypress.Commands.add('notSeeErrors', notSeeErrors)
