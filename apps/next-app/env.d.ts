declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * @description Base URL of your Strapi API, including the `/api` prefix.
     * @example "http://localhost:1337/api"
     */
    STRAPI_API_URL: string

    /**
     * @description Strapi API Token used for authenticated server-side requests.
     */
    STRAPI_API_TOKEN: string

    /**
     * @description Base URL of your Next.js frontend.
     * Must start with NEXT_PUBLIC_ to be exposed to the client.
     * @example "http://localhost:3000"
     */
    NEXT_PUBLIC_BASE_URL: string
  }
}
