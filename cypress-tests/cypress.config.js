const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Configure your E2E tests here
    specPattern: "cypress/**/*.{cy,spec}.{js,ts}",
    baseUrl: "http://epm-dev-swe-rp-vm.swedencentral.cloudapp.azure.com:8080/"

  },


})