import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // serverExternalPackages is now STABLE (top-level)
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;