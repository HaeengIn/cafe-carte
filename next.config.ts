import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.cafe-carte.fans",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
