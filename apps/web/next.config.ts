import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@napi-rs/canvas"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("@napi-rs/canvas");
    }
    return config;
  },
};

export default nextConfig;
