/**
 * form-config-auth-login controller
 */

import { factories } from '@strapi/strapi'

const contentType = 'api::form-config-auth-login.form-config-auth-login'

export default factories.createCoreController(contentType, ({ strapi }) => ({
  async find(ctx) {
    // Fetch single type — there's always only one entry
    const config = await strapi.db.query(contentType).findOne({
      populate: { fields: { populate: { field: true } } },
    })

    if (!config) {
      return ctx.notFound('No form configuration found')
    }

    // Sanitize entity output for API
    const sanitized: any = await this.sanitizeOutput(config, ctx)

    // Flatten fields (extract the nested `field` objects)
    const fields = sanitized.fields?.map(({ field }: any) => field) ?? []

    return ctx.send({ ...sanitized, fields })
  },
}))
