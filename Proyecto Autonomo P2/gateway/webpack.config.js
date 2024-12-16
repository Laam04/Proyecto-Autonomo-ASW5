const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/dashboard/index.js', // El archivo de entrada donde incluirás Apollo Client
  output: {
    filename: 'bundle.js', // El archivo de salida que se generará
    path: path.resolve(__dirname, 'dist'), // La carpeta donde se generará el bundle
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Compila tu JS moderno para que sea compatible con más navegadores
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/dashboard/index.html', // Tu archivo HTML de entrada
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Reemplaza contentBase por static
    },
    compress: true,
    port: 9000, // Puerto donde se levantará el servidor de desarrollo
    open: true, // Abrir el navegador automáticamente
  },
  resolve: {
    extensions: ['.js'], // Permite resolver archivos JS
  },
  
};
