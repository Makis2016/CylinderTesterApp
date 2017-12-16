
var path = require('path');
var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

var src = path.resolve(__dirname, 'src');
var dist = path.resolve(__dirname, 'static/ui');
var html = path.resolve(__dirname, 'html');

module.exports = {
    entry: {
        index: path.resolve(src, 'index.js'),
        login: path.resolve(src, 'login.js'),
        vendor: ['react', 'react-dom']
    },
    output: {
        path: dist,
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=es2015,presets[]=react,presets[]=stage-0']
            }, {
                test: /\.css|.less$/,
                loaders: [
                    'style',
                    'css?-minimize',
                    'postcss',
                    'less'
                ]
            }, {
                test: /\.(png|jpg?g)$/,
                loader: 'file'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        // Simply copies the files over
        new copyWebpackPlugin([
            { from: html } // to: output.path
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.optimize.UglifyJsPlugin({	//压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']	//排除关键字
        })

    ],
    devServer: {
        contentBase: dist
    },
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    //devtool: 'source-map'
};