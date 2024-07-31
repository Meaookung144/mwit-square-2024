/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    swcMinify: true,
    assetPrefix: process.env.NODE_ENV === 'production' ? './' : '',
}

module.exports = nextConfig