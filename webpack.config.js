const path = require('path')

module.exports = {

    target: 'node',

    entry: {
        MidiConvertWrapper: './src/main.ts'
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },

    resolve: {
        extensions: [".ts", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader']
            }
        ]
    }

}
