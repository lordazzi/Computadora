// continuar depois a partir deste tutorial
// https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'jasmine'
    ],
    plugins: [
      require("karma-webpack"),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter')
    ],
    mime: { 'text/x-typescript': ['ts','tsx'] },
    client: {
      clearContext: true // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222',
        ],
      }
    },
    files: [
      {
        pattern: 'src/**/*.spec.ts'
      }
    ],
    preprocessors: {
      'src/**/*.ts': ['webpack']
    },
    webpack: {
      resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules']
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: [
              {
                loader: 'awesome-typescript-loader',
                query: {
                  sourceMap: false,
                  inlineSourceMap: true,
                  compilerOptions: {
                    removeComments: true
                  }
                }
              }
            ]
          }
        ]
      },
      node: {
        global: true,
        process: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
      }
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false
  });
};