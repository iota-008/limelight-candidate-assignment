module.exports = {
  routes: './src/routes.ts',
  connector: '@layer0/starter',
  backends: {
    origin: {
      domainOrIp: 'www.lushusa.com',
      hostHeader: 'www.lushusa.com',
    },
  },
}
