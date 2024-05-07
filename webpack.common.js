module.exports = {
    entry: {
      index: './src/index.ts',
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
        {
          test: /\.html?$/,
          use: ['html-loader'],
        },
      ],
    },
    stats: {
      children: true,
    },
  };
  