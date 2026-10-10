/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  output: 'export',
  basePath:
    process.env.NEXT_PUBLIC_BASE_PATH ??
    (process.env.NODE_ENV === 'production' ? '/mayank-weds-mansi' : ''),
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
