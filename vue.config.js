module.exports = {
    configureWebpack: {
      entry: "./src/main.js",
      output: {
          filename: "./js/app.js",
          chunkFilename: "./js/chunk-vendors.js",
      }
    },
    css:{
        extract:{
            filename: "./css/main.css"
        }
    }
  }