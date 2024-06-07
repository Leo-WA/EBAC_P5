const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 10000, 
  e2e: {
    setupNodeEvents(on, config) {
     
    },
    baseUrl: 'https://agenda-contatos-react.vercel.app/', 
  },
});