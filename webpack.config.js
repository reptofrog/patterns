const path = require('path');

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "src/index.tsx"),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ],
                        "comments": true,
                        "plugins": [
                            "babel-plugin-styled-components"
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        port: 3000,
        liveReload: true,
      },
}