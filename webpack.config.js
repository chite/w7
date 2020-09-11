const path = require('path');
module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ['@babel/preset-env', '@babel/preset-react'],
                        "plugins": ["@babel/plugin-proposal-class-properties", ["@babel/plugin-transform-runtime",
                            {
                                "regenerator": true
                            }
                        ]]
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'postcss-loader',
                    options:{
                        config: {
                            path: 'postcss.config.js'
                          }
                    }
                }, {
                    loader: 'sass-loader'
                }]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[hash:7].[ext]',
                        outputPath: 'assets'
                    }
                }
            },
            {
                test: /\.svg/,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        port: 9000,
        historyApiFallback: true,
        open: true
    }
}