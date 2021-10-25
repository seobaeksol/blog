const paths = require('./paths');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const getClientEnvironment = require('./env');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.css$/;
const sassRegex = /\.css$/;
const sassModuleRegex = /\.css$/;

const publicUrl = paths.servedPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.export = {
  mode: 'production', // 프로덕션 모드 설정으로 최적화
  entry: paths.ssrIndexJs, // 엔트리 경로
  target: 'node', // node 환경 실행 명시
  output: {
    path: paths.ssrBuild,
    filename: 'server.js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: paths.servedPath,
  },
  module: {
    rules: [
      {
        oneOf: [
          // 자바스크립트 처리 (webpack.config.js)
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides',
              ),
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-svgo![path]',
                      },
                    },
                  },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            // exportOnlyLocals: true 옵션을 설정해야 실제 css 생성 안함
            loader: require.resolve('css-loader'),
            options: {
              exportOnlyLocals: true,
            },
          },
          {
            test: cssModuleRegex,
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              exportOnlyLocals: true,
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  exportOnlyLocals: true,
                },
              },
            ],
          },
          {
            test: sassModuleRegex,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: true,
                  exportOnlyLocals: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              require.resolve('sass-loader'),
            ],
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              emitFile: false, // 파일을 따로 저장 안함
              limit: 10000, // 원래는 9.76KB 넘어가면 파일로 저장, emitFile 이 false면 경로만 준비
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              emitFile: false,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
  },
  externals: [nodeExternals()],
  plugins: [new webpack.DefinePlugin(env.stringified)],
};
