// Inside cypress/support/index.js or
// Inside cypress/support/index.ts in this case
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    // --------------------------------------
    // assertions/elements.js
    // --------------------------------------
    /**
     * Assert "selector" exists on page
     * @param {string} selector CSS selector
     */
    selectorExist(selector: string): Chainable<Element>
    /**
     * Assert "selector" does NOT exist on page
     * @param {string} selector CSS selector
     */
    selectorNotExist(selector: string): Chainable<Element>
    /**
     * Assert "selector" contains "text"
     * @param {string} selector
     * @param {string} text
     */
    selectorContainsString(selector: string, text: string): Chainable<Element>
    /**
     * Assert "selector" does NOT contain "text"
     * @param {string} selector
     * @param {string} text
     */
    selectorNotContainsString(
      selector: string,
      text: string,
    ): Chainable<Element>
    /**
     * Selector should have value set
     * @param {string} selector
     * @param {string} value
     */
    selectorContainsValue(selector: string, value: string): Chainable<Element>
    /**
     * Selector should NOT have value set. Opposite of "selectorContainsValue"
     * @param {string} selector
     * @param {string} value
     */
    selectorContainsValue(selector: string, value: string): Chainable<Element>
    /**
     * Assert "selector" is visible on page
     * @param {string} selector
     */
    selectorVisible(selector: string): Chainable<Element>
    /**
     * Assert "selector" is NOT visible on page
     * @param {string} selector
     */
    selectorHidden(selector: string): Chainable<Element>
    /**
     * Assert link to "path" exists
     * @param {string} uri  URL
     */
    linkExist(uri: string): Chainable<Element>
    /**
     * Assert link to "path" does NOT exist
     * @param {string} uri uri
     */
    linkNotExist(uri: string): Chainable<Element>
    /**
     * Assert page title contains text
     * @param {string} text
     */
    titleContains(text: string): Chainable<Element>
    /**
     * Assert page description is set to "text"
     * @param {string} text
     */
    metaDescription(text: string): Chainable<Element>
    /**
     * Assert "name" meta-tag with has content set to "text"
     * @param {string} name attribute
     * @param {string} text
     */
    metaName(name: string, text: string): Chainable<Element>
    /**
     * Assert "property" meta-tag with has content set to "text"
     * @param {string} property attribute
     * @param {string} text
     */
    metaProp(name: string, text: string): Chainable<Element>
    /**
     * Assert script element with "scriptSrc" exists
     * @param {string} scriptSrc
     */
    scriptExist(scriptSrc: string): Chainable<Element>
    /**
     * "Error" selector does NOT exist on page. Alias
     */
    notSeeErrors(): Chainable<Element>
    // --------------------------------------
    // assertions/string.js
    // --------------------------------------
    /**
     *  Assert "string" exists within body
     * @param {string} text   Text to find
     */
    stringExist(string: string): Chainable<Element>
    /**
     * Assert "string" does NOT exist within body
     * @param {string} string   Text to find
     */
    stringNotExist(string: string): Chainable<Element>
    // --------------------------------------
    // assertions/url.js
    // --------------------------------------
    /**
     * Browser URL should match baseURL + "path"
     * @param {string} path appearing after baseURL
     */
    pathEqual(path: string): Chainable<Element>
    /**
     * Browser URL should NOT match baseURL + "path"
     * @param {string} path appearing after baseURL
     */
    pathNotEqual(path: string): Chainable<Element>
    /**
     * Browser URL should include the "path"
     * @param {string} path appearing after baseURL
     */
    pathIncludes(string: string): Chainable<Element>
    /**
     * Browser URL should NOT include the "path"
     * @param {string} path appearing after baseURL
     */
    pathNotIncludes(string: string): Chainable<Element>
    /**
     * Request "path" and expect a "statusCode"
     * @param {string} path appearing after baseURL
     */
    expectStatus(string: string): Chainable<Element>
    // --------------------------------------
    // browser/page.js
    // --------------------------------------
    /**
     * Set header to relative, aka NOT sticky.
     */
    disableHeader(): Chainable<Element>
    // --------------------------------------
    // browser/screenshot.js
    // --------------------------------------
    /**
     * Assert "selector" element matches image screenshot
     * @param {string} selector
     */
    matchElement(string: string): Chainable<Element>
    /**
     * Assert "selector" element matches "named" image screenshot
     * @param {string} selector
     */
    matchElementNamed(string: string): Chainable<Element>
    /**
     * Assert page matches screenshot
     */
    matchPage(): Chainable<Element>
    // --------------------------------------
    // interactions/click.js
    // --------------------------------------
    /**
     * Click on an element "selector"
     * @param {string} selector element
     */
    clickSelector(selector: string): Chainable<Element>
    /**
     * Click on an the first element containing the "text"
     * @param {string} text     needle to find
     */
    clickText(text: string): Chainable<Element>
    /**
     * Click on an the first element containing the "text" within the "selector" element
     * @param {string} text     needle to find
       @param {string} selector haystack selector to search
    */
    clickTextIn(text: string, selector: string): Chainable<Element>
    /**
     * Select checkbox/radio element by "selector"
     * @param {string} selector element
     */
    checkSelector(selector: string): Chainable<Element>
    /**
     * Select an option in a select "name"
     * @param {string} value    'value' to select
     * @param {string} selector element
     */
    selectOption(value: string, selector: string): Chainable<Element>
    /**
     * Alias to submit a form by clicking on a "selector"
     * @param {string} selector Submit button selector
     */
    submit(selector: string): Chainable<Element>
    // --------------------------------------
    // interactions/scroll.js
    // --------------------------------------
    /**
     * Scroll to position within selector
     * @param {string} position     relative position to scroll to
     * @param {string} selector     CSS selector
     */
    scrollToSelectorPosition(
      position: string,
      selector: string,
    ): Chainable<Element>
    /**
     * Scroll vertically a set amount
     * @param {number} pixels   Number of 'pixels' to scroll
     */
    scrollDistance(pixels: string): Chainable<Element>
    // --------------------------------------
    // interactions/type.js
    // --------------------------------------
    /**
     * Enter a "value" into a "name" form element
     * @param {string} value    data to enter into form
     * @param {string} name     "name" attribute of form element
     */
    typeStringInto(value: string, name: string): Chainable<Element>
    /**
     * Enter a "value" into a "name" form element controlled by CKEditor
     * @param {string} value    data to enter into form
     * @param {string} name     "name" attribute of form element
     */
    typeStringIntoCkeditor(value: string, name: string): Chainable<Element>
    // --------------------------------------
    // framework/laravel/app.js
    // --------------------------------------
    /**
     * Trigger an Artisan command.
     *
     * @param {String} command
     * @param {Object} parameters
     * @param {Object} options
     *
     * @example cy.artisan('cache:clear');
     */
    artisan(
      command: string,
      parameters: object,
      options: object,
    ): Chainable<Element>
    /**
     * Execute arbitrary PHP.
     *
     * @param {String} command
     *
     * @example cy.php('2 + 2');
     * @example cy.php('App\\User::count()');
     */
    php(command: string): Chainable<Element>
    /**
     * Fetch and store all named routes.
     *
     * @example cy.refreshRoutes();
     */
    refreshRoutes(value: string, name: string): Chainable<Element>
    // --------------------------------------
    // framework/laravel/auth.js
    // --------------------------------------
    /**
     * Create a new user and log them in.
     *
     * @param {Object} attributes
     *
     * @example cy.login();
     * @example cy.login({ name: 'JohnDoe' });
     */
    login(attributes: object): Chainable<Element>
    /**
     * Logout the current user.
     *
     * @example cy.logout();
     */
    logout(): Chainable<Element>
    // --------------------------------------
    // framework/laravel/database.js
    // --------------------------------------
    /**
     * Seed the database.
     *
     * @param {string} seederClass
     *
     * @example cy.seed();
     *          cy.seed('PlansTableSeeder');
     */
    seed(seederClass: string): Chainable<Element>
    /**
     * Refresh the database state.
     *
     * @param {object} options
     *
     * @example cy.refreshDatabase();
     *          cy.refreshDatabase({ '--drop-views': true });
     */
    refreshDatabase(options: object): Chainable<Element>
    /**
     * Create a new Eloquent factory.
     *
     * @param {string} model
     * @param {number|null} times
     * @param {object|null} attributes
     *
     * @example cy.createModel('App\\User');
     */
    createModel(
      model: string,
      times?: number,
      attributes?: object,
    ): Chainable<Element>
  }
}
