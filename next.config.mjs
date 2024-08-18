/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "files.stripe.com" },
      { hostname: "d1wqzb5bdbcre6.cloudfront.net" },
      { hostname: "*.blob.vercel-storage.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  webpack: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensionAlias: {
          ".js": [".js", ".ts"],
          ".jsx": [".jsx", ".tsx"],
        },
      },
    };
  },
};
export default nextConfig;
