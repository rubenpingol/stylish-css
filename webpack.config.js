const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = (env, argv) => {
    let config = {
        devtool: 'source-map',
        mode: argv.mode,
        entry: {
            index: ['./src/js/index.js', './src/scss/styles.scss'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/, // Set loaders to transform files,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: { importLoaders: 1, sourceMap: true }
                            },
                            'postcss-loader',
                        ],
                    }),
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader', options: { sourceMap: true } },
                            { loader: 'postcss-loader', options: { sourceMap: true } },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                    prependData: `$env: ${argv.mode};`,
                                }
                            }
                        ]
                    })
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new ExtractTextPlugin({ filename: 'css/[name].css' }),
        ]
    };

    return config;
}