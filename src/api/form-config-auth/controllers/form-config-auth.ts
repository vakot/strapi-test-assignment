/**
 * form-config-auth controller
 */

import { factories } from '@strapi/strapi'

const contentType = `api::form-config-auth.form-config-auth`

export default factories.createCoreController(contentType, ({ strapi }) => ({
  async findOne(ctx) {
    const { countryId } = ctx.params

    if (!countryId) {
      return ctx.badRequest('country code is required')
    }

    // find record by country relation
    const config = await strapi.db.query(contentType).findOne({
      where:
        countryId === 'default'
          ? { country: { default: true } }
          : { country: countryId },
      populate: { fields: { populate: { field: true } } },
    })

    if (!config) {
      return ctx.notFound('No form configuration found for this country')
    }

    const sanitized: any = await strapi.contentAPI.sanitize.output(
      config,
      strapi.contentType(contentType),
    )

    const fields = sanitized.fields.map(({ field }) => field)

    return ctx.send({ ...sanitized, fields })
  },
}))
