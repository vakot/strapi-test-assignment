import axios from 'axios'

/**
 * @description Global axios client with strapi-api configuration setup
 */
const client = axios.create({
  baseURL: process.env.STRAPI_API_URL,
  headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
})

export { client as strapi }
