const { defineConfig } = require("@vue/cli-service");
const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        Quill: 'quill/dist/quill.js'
      })
    ],
    devtool: 'source-map'
  },
});
