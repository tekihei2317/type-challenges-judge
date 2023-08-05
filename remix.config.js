/** @type {import('@remix-run/dev').AppConfig} */
export default {
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
  server: './server.ts',
  serverBuildPath: 'functions/[[path]].js',
  serverConditions: ['workerd', 'worker', 'browser'],
  serverDependenciesToBundle: 'all',
  serverMainFields: ['browser', 'module', 'main'],
  serverMinify: true,
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  serverNodeBuiltinsPolyfill: {
    modules: {
      // typescriptを動かすための設定
      inspector: 'empty',
      path: 'empty',
      os: 'empty',
      // serverNodeBuiltinsPolyfillを設定すると、remix buildのvfileでCould not resolve ("process" | "url")になったため追加
      process: true,
      url: true,
    },
  },
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
}
