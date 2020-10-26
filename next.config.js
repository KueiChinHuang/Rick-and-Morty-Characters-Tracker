module.exports = {
    webpackDevMiddleware: config => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
  
      return config
    },
  }

  module.exports = {
    async redirects() {
      return [
        {
          source: '/sth',
          destination: '/',
          permanent: true,
        },
      ]
    },
  }