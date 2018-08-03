const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const webConfig = {
  mode: 'production',
  entry: './src/api.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },
  output: {
    library: 'Yoga',
    filename: 'Yoga.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

const nodeConfig = {
  mode: 'production',
  entry: './src/api.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },
  output: {
    library: 'Yoga',
    filename: 'Yoga.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  }
}

module.exports = [
  webConfig,
  nodeConfig
]
