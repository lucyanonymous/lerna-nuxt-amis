import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import { version } from './package.json';

const {
  HOST,
  PORT,
  NODE_ENV,
  PAGE_BASE_PATH = '/pages',
} = process.env;

const isDev = NODE_ENV === 'development';

export default {
  render: {
    bundleRenderer: {
      runInNewContext: false,
    },
  },

  ssr: true,

  dev: isDev,

  server: {
    port: PORT || 3000,
    host: HOST || '0.0.0.0',
  },

  env: {
    pageBasePath: PAGE_BASE_PATH,
  },

  css: [
  ],

  plugins: [
    '~/plugins/bootstrap',
  ],
  serverMiddleware: [
    // '~/server/checkSpa',
  ],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
  ],

  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { filename: 'env/.env' }],
  ].filter(Boolean),

  router: {
    base: PAGE_BASE_PATH,
  },

  routerModule: {
    mode: 'history',
  },

  axios: {
    proxy: true,
    timeout: 10 * 60 * 1000,
  },

  build: {
    publicPath: '/cdn',
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    splitChunks: {
      name: isDev ? true : undefined,
    },
    babel: {
      presets({ isServer }, [preset, options]) {
        options.jsx = {
          functional: false,
          injectH: false,
        };

        return [
          'vca-jsx',
          [
            preset,
            options,
          ],
        ];
      },
    },
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : '[contenthash].css'),
    },
    transpile: ['lodash-es'],
    extractCSS: !isDev,
    extend(config) {
      config.resolve.alias.vue$ = 'vue/dist/vue.esm.js';
      config.plugins.push(new CopyPlugin({
        patterns: [
          {
            from: '../../node_modules/amis/sdk',
            to: 'amis/sdk',
          },
        ],
      }));
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          VERSION: version,
        }),
      }),
    ],
  },
  vue: {
    config: {
      devtools: true,
      performance: false,
    },
  },
};
