import defaultConfig from './cypress.config.js';

export default {
  ...defaultConfig,
  defaultBrowser: 'firefox',
  reporterOptions: {
    mochaFile: 'logs/cypress-firefox-junit.xml',
  },
  screenshotsFolder: 'logs/firefox/screenshots',
  videosFolder: 'logs/firefox/videos',
}
