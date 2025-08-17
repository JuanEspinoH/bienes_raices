import path from 'path'

export default {
  mode: 'development',
  entry: {
    mapa: './src/mapas.js',
    agregarImagen: './src/agregarImagen.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('public/js'),
  },
}
