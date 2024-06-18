# Cypress <!-- omit in toc -->

- [Install](#install)
- [Run via Docker image](#run-via-docker-image)
  - [Connecting to a locally hosted site](#connecting-to-a-locally-hosted-site)
  - [Add GUI ability through WSL](#add-gui-ability-through-wsl)
- [Configure](#configure)
  - [Cypress GUI font support](#cypress-gui-font-support)
  - [Browser language](#browser-language)
    - [Chrome](#chrome)
  - [Media output](#media-output)
    - [Screenshots](#screenshots)
    - [Videos](#videos)
  - [Reporters](#reporters)
- [Tips](#tips)
  - [Iframes](#iframes)
  - [Network stubbing](#network-stubbing)
    - [Return fixture results](#return-fixture-results)
    - [Dynamic](#dynamic)
    - [Handling errors](#handling-errors)
- [Help](#help)
  - [Element **not** exists](#element-not-exists)
  - [Environmental Variables](#environmental-variables)
  - [Basic authentication](#basic-authentication)
- [Troubleshooting](#troubleshooting)
  - ["Cypress: error while loading shared libraries: libnss3.so"](#cypress-error-while-loading-shared-libraries-libnss3so)

## Install

- [Installing Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html)

```bash
yarn add cypress --save-dev
```

- Add scripts to `package.json`

```json
{
  "scripts": {
    ...
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  }
}
```

- The first time Cypress runs, it can take a while to initialize.
- The `cypress` folder contains boilerplate.
- `./cypress/integration/examples` directory is safe to delete.

Linux systems require [prerequisites](https://docs.cypress.io/guides/getting-started/installing-cypress#Linux-Prerequisites).

## Run via Docker image

- [Running Cypress via a single Docker command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/)

```bash
docker run -it --rm -v ${PWD}:/e2e -w /e2e --entrypoint=cypress cypress/included:13.11.0 run
```

| switch                   | description                                                     |
| ------------------------ | --------------------------------------------------------------- |
| `-it`                    | interactive terminal                                            |
| `-v ${PWD}:/e2e`         | `${PWD}:/e2e` maps the current directory to `/e2e` in the image |
|                          | - Replace `${PWD}` with `%CD%` if in CMD prompt                 |
|                          | - `${PWD}` & `$(pwd)` *should* would in PowerShell & Ubuntu     |
| `-w /e2e`                | set working directory to `/e2e`                                 |
| `cypress/included:7.5.0` | Cypress image:version to use                                    |
| `run`                    | command to execute                                              |

- Show container information by replacing `run` with `info`

```bash
docker run -it --rm -v ${PWD}:/e2e -w /e2e --entrypoint=cypress cypress/included:13.11.0 info
```

- Specify a browser using the `--browser` switch. For example: `--browser chrome`, default is `electron`

```bash
docker run -it --rm -v ${PWD}:/e2e -w /e2e --entrypoint=cypress cypress/included:13.11.0 run --browser chrome
```

### Connecting to a locally hosted site

- Run command and pass an environmental variable to point to docker: `-e CYPRESS_baseUrl=http://host.docker.internal:8000`
- `https://host.docker.internal:8000` shares a local port `8000` with docker.

<!-- markdownlint-disable line-length -->
```bash
docker run -it --rm -v ${PWD}:/e2e -w /e2e --entrypoint=cypress -e CYPRESS_baseUrl=http://host.docker.internal:8000 cypress/included:13.11.0 run
```
<!-- markdownlint-enable line-length -->

### Add GUI ability through WSL

- Make sure BASH / ZSH has `DISPLAY` environment variable

```bashrc
echo $DISPLAY
```

- Run command from **`BASH`** with required switches:
  - `-e CYPRESS_baseUrl=http://host.docker.internal:8000`,
  - `-e DISPLAY`,
  - `open --project .`

<!-- markdownlint-disable line-length -->
```bash
docker run -it --rm -v ${PWD}:/e2e -w /e2e --entrypoint=cypress -e CYPRESS_baseUrl=http://host.docker.internal:8000 -e DISPLAY cypress/included:13.11.0 open --project .
```
<!-- markdownlint-enable line-length -->

| switch        | description                                     |
| ------------- | ----------------------------------------------- |
| `-e DISPLAY`  | pass the DISPLAY variable through to docker     |
| `open`        | open cypress                                    |
| `--project .` | specify the project is in the current directory |

## Configure

### Cypress GUI font support

- If Cypress GUI displays `□` in the step logs, it is missing the a character set/font.
- A straight forward solution is to map your local font directory as a volume:

    ```docker
    services:
      cypress:
        image: cypress/included:13.11.0
        volumes:
          - /usr/share/fonts:/usr/share/fonts/shared
    ```

### Browser language

- Firefox removed the language [CommandLineOption](https://wiki.mozilla.org/Firefox/CommandLineOptions).

#### Chrome

- Chrome Windows can add a [launch option](https://developer.chrome.com/extensions/i18n#locales-testing): `cypress/plugins/index.js`

```js
// cypress/plugins/index.js
module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
      // Windows only!!
      if (browser.family === 'chromium') {
          launchOptions.args.push('--lang=ja')
          return launchOptions
      }
  });
}
```

- On Linux systems, set an environmental variable

```shell
export LANG="ja_JP.UTF-8"
```

- On Cypress Docker images, use the Linux method. Update `docker-compose.yml`.

```yaml
services:
  cypress:
    image: cypress/included:13.11.0
    environment:
      - LANG=ja_JP.UTF-8
```

### Media output

#### Screenshots

- Manually take a screenshot

  ```js
  cy.screenshot()
  ```

- Automatically take screen shot when tests fall.

  ```js
  {
    ...
    screenshotOnRunFailure: true,
  }
  ```

- Configure the screenshot output directory:

  ```js
  {
    ...
    screenshotsFolder: 'logs/screenshots',
  }
  ```

#### Videos

- Video output is disabled by default. Enable it in `cypress.config.js`

  ```js
  {
    ...
    video: true,
  }
  ```

- Configure the video output directory:

  ```js
  {
    ...
    videosFolder: 'logs/video',
  }
  ```

### Reporters

- To output a 'junit' log file:

    ```js
    {
      ....
      reporter: 'junit',
      reporterOptions: {
        mochaFile: 'logs/cypress-junit.xml',
      },
    }
  ```

## Cucumber

- Install `cypress-cucumber-preprocessor`

```bash
npm add cypress cypress-cucumber-preprocessor --save-dev
```

- Update `cypress.config.js` to include `feature` files

```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: [
      'cypress/e2e/**/*.{js,feature}'
    ],
  },
})
```

- Add `cucumber` to `./cypress/plugins/index.js`

```javascript
const cucumber = require('cypress-cucumber-preprocessor').default

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
}
```

## Tips

### Iframes

- Find the element

```js
// Find the specific iframe
cy.get('iframe[name="my-iframe"]').then(($iframe) => {
  // Get it contents
  const iframeContents = $iframe.contents()
  // Create an alias for later usage
  cy.wrap(iframeContents.find('form')).as('form')
})
```

- Interact with the element

```js
// Prefix the alias name (as('form)) with @
cy.get('@form').find('[name="name"]').type('FirstName LastName')
```

### Network stubbing

#### Return fixture results

```js
describe('Network Stubbing', () => {
  beforeEach(() => {
    // Intercept GET calls to the URL and replace with a fixture
    cy.intercept('GET', 'https://api.example.com/users', {
      fixture: 'users.json'
    }).as('getUsers')
  })

  it('Visits a website that uses an external API', () => {
    cy.visit('https://www.example.com')

    // Wait for the AJAX call to finish and assert response
    cy.wait('@getUsers').then(({ response }) => {
      expect(response.statusCode).to.equal(200)
      expect(response.body).to.have.length(2)
      expect(response.body[0]).to.have.property('name', 'FirstName LastName')
    })
  })
})
```

#### Dynamic

```js
it('Handles dynamic response', () => {
  // Intercept the dynamic API route and respond with user data
  cy.intercept('GET', '/api/users/*', req => {
    req.reply({
      statusCode: 200,
      body: {
        id: req.path.split('/')[3],
        name: 'FirstName LastName',
        email: 'fullname@example.com',
        age: 30
      }
    })
  }).as('dynamicApiRoute')

  // Visit a website and wait for response from mocked API route
  cy.visit('/')
  cy.wait('@dynamicApiRoute')
  // Assert that the response contains the correct user data
  cy.get('@dynamicApiRoute')
    .its('response.body')
    .should('deep.equal', {
      id: '1',
      name: 'FirstName LastName',
      email: 'fullname@example.com',
      age: 30
    })
})
```

#### Handling errors

```js
it('Handles errors', () => {
  // Intercept an API route that returns a 500 server error
  cy.intercept('GET', '/api/error', {
    statusCode: 500,
    body: 'Internal Server Error'
  }).as('errorRoute')

  // Visit the website and wait for response from mocked API route
  cy.visit('/')
  cy.wait('@errorRoute').then(({ response }) => {
    expect(response.statusCode).to.equal(500)
    expect(response.body).to.equal('Internal Server Error')
  })
})
```

## Help

### Element **not** exists

```js
// Text does not exist
cy.contains('pinches of pepper')
  .should('not.exist')
// Element does not exist
cy.get('.foo').should('not.exist')
```

### Environmental Variables

- Add `cypress.env.json` to `.gitignore`
- Any settings in `cypress.env.json` will override `cypress.json`

```json
{
  "user_name": "admin",
  "user_password": "s3creT-p@ssw0rd"
}
```

```js
describe('Login', () => {
  it('successfully', () => {
    cy.visit('https://example.com/login')

    cy.get('#user').type(Cypress.env('user_name'))
    cy.get('#password').type(Cypress.env('user_password'))
    cy.contains('Login').click()
  })
})
```

### Basic authentication

- Set the `baseUrl` to `http://username:password@site.local` // secretlint-disable-line

## Troubleshooting

### "Cypress: error while loading shared libraries: libnss3.so"

- [Install missing libraries](https://stackoverflow.com/questions/55835870/cypress-failed-to-start-on-ubuntu-linux)

```bash
# spell-checker: disable
sudo apt-get update -y
sudo apt-get install xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
# spell-checker: enable
```
