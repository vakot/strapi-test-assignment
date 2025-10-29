import auth from './controllers/auth'

export default (plugin) => {
  const originalAuthFactory = plugin.controllers.auth

  plugin.controllers.auth = ({ strapi }) => {
    const originalAuth = originalAuthFactory({ strapi })
    originalAuth.register = auth({ strapi }).register
    return originalAuth
  }

  return plugin
}
