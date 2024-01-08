const nextConfig = {
  env: {
    NEXT_PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN,
    NEXT_PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN,
  },
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
