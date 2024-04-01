/** @type {import('next').NextConfig} */
const nextConfig = {
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
