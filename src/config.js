require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'local',
  port: process.env.PORT,
  //apiHost: process.env.APIHOST || 'localhost',
  //apiPort: process.env.APIPORT,
  apiHost: 'api-test.validbook.org/v1',
  app: {
    title: 'Validbook',
    head: {
      title: 'Validbook',
      meta: [
        { name: 'description', content: 'Validbook – a universal platform for cooperation.' },
        { charset: 'utf-8' },
        { property: 'og:title', content: 'Validbook' },
        { property: 'og:site_name', content: 'validbook.org' },
        { property: 'og:description', content: 'Validbook – a universal platform for cooperation.' },
        { property: 'og:image', content: 'http://futurama11001111.validbook.org/logo.jpg' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' },
        { property: 'twitter:card', content: 'summary' },
        { property: 'twitter:title', content: 'Validbook' },
        { property: 'twitter:description', content: 'Validbook – a universal platform for cooperation.' },
        { property: 'twitter:image', content: 'http://futurama11001111.validbook.org/logo.jpg' }
      ]
    }
  }
}, environment);
