const WebPackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = WebPackPreprocessor({
  webpackOptions: {
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      ]
    }
  }
})
