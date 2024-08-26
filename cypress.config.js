export default {
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'logs/cypress-junit.xml',
  },
  video: true,
  videosFolder: 'logs/video',
  screenshotOnRunFailure: true,
  screenshotsFolder: 'logs/screenshots',
  // Mobile viewport
  viewportWidth: 375,
  viewportHeight: 667,
  // Desktop
  // viewportWidth: 1920,
  // viewportHeight: 1080,
  e2e: {
    specPattern: 'tests/e2e',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
