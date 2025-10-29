/**
 * form-config-auth-login controller
 */

import { factories } from '@strapi/strapi'

const contentType = 'api::form-config-auth-login.form-config-auth-login'

export default factories.createCoreController(contentType, ({ strapi }) => ({
  async find(ctx) {
    const config = await strapi.db.query(contentType).findOne({
      populate: { fields: { populate: { field: true } } },
    })

    if (!config) {
      return ctx.notFound('No form configuration found')
    }

    const sanitized: any = await strapi.contentAPI.sanitize.output(
      config,
      strapi.contentType(contentType),
    )

    const fields = sanitized.fields?.map(({ field }: any) => field) ?? []

    return ctx.send({ ...sanitized, fields })
  },
}))
