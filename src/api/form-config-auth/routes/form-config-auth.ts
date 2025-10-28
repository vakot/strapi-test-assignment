export default {
  routes: [
    {
      method: 'GET',
      path: '/form-config-auth/:countryId',
      handler: 'form-config-auth.findOne',
      config: { auth: false },
    },
  ],
}
