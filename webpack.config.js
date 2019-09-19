const path = require('path');
const APP_DIR = path.resolve(__dirname, 'src/app');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let config = {
    entry: [
        './src/app/index.js',
        './src/app/global/less/styles.less'
    ],
    plugins: [
        // Clean dist folder
        new CleanWebpackPlugin(),
        // Generate dist/index.html
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }), 
        // Extract CSS into file
        new MiniCssExtractPlugin(),
        // Minify CSS
        new OptimizeCSSAssetsPlugin(),
        // Uglify
        new UglifyJsPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module : {
        rules : [
            {
                test : /\.js?/,
                include : APP_DIR,
                loader : 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                        
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                include: [
                    path.resolve(__dirname, 'src/assets/fonts/')
                ],
                use: [
                    {
                        loader: 'file-loader',
                        
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                include: [
                    path.resolve(__dirname, 'src/assets/images/')
                ],
                use: [
                    {
                        loader: 'file-loader',                        
                    
                    }
                ]
            },
            {
                test: /\.xml$/,
                include: [
                    path.resolve(__dirname, 'src/assets/config/')
                ],
                use: [
                    {
                        loader: 'file-loader',                        
                       
                    }
                ]
            }
        ]
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
        config.devServer=  {
            contentBase: './dist'
        }
    }

    return config;
};