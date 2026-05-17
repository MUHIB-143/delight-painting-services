import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/delight-painting",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
