const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
    watch: true,
    watchOptions: {
        aggregateTimeout: 600,
        ignored: '/node_modules/',
        poll: 2000,
    },
    module: {
        rules: [
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        },
                    }
                ],
            }
        ],
    },
};
// command: webpack --watch --info-verbosity verbose OR npx webpack