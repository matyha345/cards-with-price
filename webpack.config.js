const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path')

// Определение режима сборки (development или production)
const mode = process.env.NODE_ENV || 'development';

// Установка флага для режима разработки
const devMode = mode === 'development'

// Определение цели сборки в зависимости от режима
const target = devMode ? 'web' : 'browserslist';

// Установка инструмента для генерации source maps в зависимости от режима
const devtool = devMode ? 'source-map' : undefined;

// Экспорт конфигурации Webpack
module.exports = {
    mode,
    target,
    devtool,

    // Настройки встроенного сервера для разработки
    devServer: {
        port: 3000,  // Порт для запуска сервера
        open: true,  // Автоматическое открытие браузера при старте сервера
    },

    // Точка входа: путь к главному файлу приложения
    entry: path.resolve(__dirname, 'src', 'index.js'),

    // Настройки для сгенерированных файлов
    output: {
        path: path.resolve(__dirname, 'dist'),  // Путь для сохранения сгенерированных файлов
        clean: true,  // Очистка папки dist перед каждой сборкой
        filename: '[name].[contenthash].js',  // Название сгенерированного JS файла
        assetModuleFilename: 'assets/[name][ext]'  // Сохранение ресурсов в папке assets
    },

    // Плагины, используемые в сборке
    plugins: [
        // Плагин для генерации HTML файла на основе шаблона
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        // Плагин для извлечения CSS в отдельные файлы
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
        }),
    ],

    // Правила обработки файлов модулей
    module: {
        rules: [
            // Правило для обработки HTML файлов
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            // Правило для обработки файлов стилей (CSS и SCSS)
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')]
                            }
                        }
                    },
                    "sass-loader"
                ],
            },
            // Правило для обработки файлов шрифтов
            {
                test: /\.(woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                  filename: 'fonts/[name][contenthash].[ext]',
                },
              },
            // Правило для обработки файлов изображений
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[ext]'
                }
            },
            // Правило для обработки файлов JavaScript с использованием Babel
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ],
    },
}

