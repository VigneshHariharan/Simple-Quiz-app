const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'routes', 'index.html'),
    filename: 'index.html',
    inject: 'body',
    chunks:['quizEntry'],

});

const HTMLWebpackPluginConfigQuiz = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'routes', 'quiz.html'),
    filename: 'quiz.html',
    inject: 'body',
    chunks:['quizPlayer'],

});

const HTMLWebpackPluginConfigAnalytics = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'routes', 'analytics.html'),
    filename: 'analytics.html',
    inject: 'body',
    chunks:['quizAnalytics'],

});



module.exports = {
  mode: "development",
  entry: {
    quizEntry: "./src/index.js",
    quizPlayer: './src/quiz.js',
    quizAnalytics: './src/analytics.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: { "bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "routes"),
    },
    compress: true,
    port: 3000,
  },
  plugins: [HTMLWebpackPluginConfig, HTMLWebpackPluginConfigQuiz, HTMLWebpackPluginConfigAnalytics],
};
