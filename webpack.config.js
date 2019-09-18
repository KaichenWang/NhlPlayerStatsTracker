// var webpack = require('webpack');
// var path = require('path');
// require("babel-polyfill");

// var BUILD_DIR = path.resolve(__dirname, 'src/public');
// var APP_DIR = path.resolve(__dirname, 'src/app');
// var CompressionPlugin = require('compression-webpack-plugin');

// var config = {
//     entry: ["babel-polyfill", APP_DIR + '/index.js'],
//     output: {
//         path: BUILD_DIR,
//         filename: 'bundle.js'
//     },
//     module : {
//         loaders : [
//             {
//                 test : /\.js?/,
//                 include : APP_DIR,
//                 loader : 'babel-loader'
//             }
//         ]
//     },
//     plugins: [
//         new webpack.DefinePlugin({ // <-- key to reducing React's size
//             'process.env': {
//                 'NODE_ENV': JSON.stringify('production')
//             }
//         }),
//         new webpack.optimize.DedupePlugin(), //dedupe similar code
//         new webpack.optimize.UglifyJsPlugin(), //minify everything
//         new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
//         new CompressionPlugin({   //<-- Add this
//             asset: "[path].gz[query]",
//             algorithm: "gzip",
//             test: /\.js$|\.css$|\.html$/,
//             threshold: 10240,
//             minRatio: 0.8
//         })
//     ]
// };

// module.exports = config;



const path = require('path');
var APP_DIR = path.resolve(__dirname, 'src/app');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: [
        './src/app/index.js',
        './src/app/static/less/styles.less'
    ],
    devtool: 'inline-source-map',
    plugins: [
        // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
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
                        loader: 'style-loader',
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
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
            }
        ]
    }
};