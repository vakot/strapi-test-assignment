import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@app': path.resolve(__dirname, './app'),
      '@components': path.resolve(__dirname, './components'),
      '@constants': path.resolve(__dirname, './constants'),
      '@contexts': path.resolve(__dirname, './contexts'),
      '@lib': path.resolve(__dirname, './lib'),
      '@public': path.resolve(__dirname, './public'),
      '@services': path.resolve(__dirname, './services'),
      '@types': path.resolve(__dirname, '../../types'),
    }
    return config
  },
}

export default nextConfig
