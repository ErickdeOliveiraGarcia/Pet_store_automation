const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
    },
  baseUrl: 'http://209.133.222.126:8080', 
  
  env: {
    diretorio: '/jpetstore/actions/Catalog.action' 
  }
  },

});
