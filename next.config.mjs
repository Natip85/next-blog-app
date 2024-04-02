/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c4.wallpaperflare.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
