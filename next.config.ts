import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    github: {
      stale: 3600, 
      revalidate: 900, 
      expire: 86400, 
    },
  },
};

export default nextConfig;
