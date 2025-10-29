import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'plugin::users-permissions.user',
  ({ strapi }) => ({
    async register(ctx) {
      const { email, password, confirm_password, username, ...details } =
        ctx.request.body

      if (!email) {
        return ctx.badRequest("'email' field is required")
      }

      if (!details.country) {
        return ctx.badRequest('Invalid country')
      }

      if (!password) {
        return ctx.badRequest("'password' field is required")
      }

      if (!confirm_password) {
        return ctx.badRequest("'confirm_password' field is required")
      }

      if (password !== confirm_password) {
        return ctx.badRequest('Passwords do not match')
      }

      // Check if user already exists
      const existing = await strapi.db
        .query('plugin::users-permissions.user')
        .findOne({ where: { email } })

      if (existing) {
        return ctx.badRequest("'email' or 'username' already taken")
      }

      const defaultRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'authenticated' } })

      if (!defaultRole) {
        throw new Error('Default role (authenticated) not found')
      }

      let createdUser = null

      try {
        // Create base user via users-permissions service (handles hashing etc.)
        createdUser = await strapi
          .plugin('users-permissions')
          .service('user')
          .add({
            email,
            username,
            password,
            provider: 'local',
            role: defaultRole.id,
          })

        // Sanitize output
        const userContentType = strapi.contentType(
          'plugin::users-permissions.user',
        )

        const sanitizedUser: any = await strapi.contentAPI.sanitize.output(
          createdUser,
          userContentType,
        )

        // Create linked user-details record
        const userDetails = await strapi.db
          .query('api::user-details.user-details')
          .create({ data: { ...details, user: sanitizedUser.id } })

        // Sanitize output
        const userDetailsContentType = strapi.contentType(
          'api::user-details.user-details',
        )

        const sanitizedUserDetails = await strapi.contentAPI.sanitize.output(
          userDetails,
          userDetailsContentType,
        )

        // Auto-login (optional)
        const jwt = strapi
          .plugin('users-permissions')
          .service('jwt')
          .issue({ id: sanitizedUser.id })

        return ctx.send({
          jwt,
          user: { ...sanitizedUser, details: sanitizedUserDetails },
        })
      } catch (err) {
        if (createdUser?.id) {
          try {
            await strapi
              .plugin('users-permissions')
              .service('user')
              .delete(createdUser.id)
          } catch (cleanupErr) {
            strapi.log.warn(
              `Failed to cleanup user ${createdUser.id}:`,
              cleanupErr,
            )
          }
        }

        strapi.log.error('User registration failed:', err)
        return ctx.badRequest('Registration failed')
      }
    },
  }),
)
