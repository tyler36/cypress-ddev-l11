import defaultConfig from './cypress.config.js';

export default {
  ...defaultConfig,
  defaultBrowser: 'chrome',
  reporterOptions: {
    mochaFile: 'logs/cypress-chrome-junit.xml',
  },
  screenshotsFolder: 'logs/chrome/screenshots',
  videosFolder: 'logs/chrome/videos',
}
