const path = require('path');
const APP_DIR = path.resolve(__dirname, 'src/app');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


let config = {
    entry: [
        './src/app/index.js',
        './src/app/global/less/styles.less'
    ],
    plugins: [        
        new CleanWebpackPlugin(), // Clean dist folder        
        new HtmlWebpackPlugin({
            template: 'src/index.html' // Generate dist/index.html
        }),        
        new MiniCssExtractPlugin(), // Extract CSS into file        
        new OptimizeCSSAssetsPlugin(), // Minify CSS        
        new UglifyJsPlugin() // Uglify JS
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module : {
        rules : [
            {
                test: /\.js?/,
                include: APP_DIR,
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,              
                    'css-loader?sourceMap',
                    'less-loader?sourceMap'
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                include: [
                    path.resolve(__dirname, 'src/assets/fonts/')
                ],
                use: ['file-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                include: [
                    path.resolve(__dirname, 'src/assets/images/')
                ],
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['file-loader']
            }
        ]
    }
};

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';

    config.devtool = isDev ? '#eval-source-map' : 'source-map';

    if (isDev) {        
        config.devServer = {
            stats: {
                children: false, // Hide children information
                maxModules: 0 // Set the maximum number of modules to be shown
            }
        }
    }

    return config;
};