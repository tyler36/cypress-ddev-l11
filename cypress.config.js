import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'

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
    specPattern: 'tests/e2e/**/*.{cy.js,cy.ts,feature}',
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      })
      on('file:preprocessor', bundler)
      await addCucumberPreprocessorPlugin(on, config)
      return config
    },
  },
};
