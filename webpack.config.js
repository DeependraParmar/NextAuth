const path = require('path');

module.exports = {
    output: {
        filename: 'index.html',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    }
                ],
            },
        ],
    },
};