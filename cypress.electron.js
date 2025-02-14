import defaultConfig from './cypress.config.js';

export default {
  ...defaultConfig,
  defaultBrowser: 'electron',
  reporterOptions: {
    mochaFile: 'logs/cypress-electron-junit.xml',
  },
  screenshotsFolder: 'logs/electron/screenshots',
  videosFolder: 'logs/electron/videos',
}
