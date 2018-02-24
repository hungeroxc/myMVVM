const path = require('path')


module.exports = {
    entry: './src/MVVM.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.js'
    }
}