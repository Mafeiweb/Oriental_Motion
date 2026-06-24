import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = "Oriental_Motion";

const nextConfig: NextConfig = {
  typedRoutes: false,
  output: "export",
  images: {
    unoptimized: true
  },
  basePath: isGitHubPages ? `/${repositoryName}` : undefined,
  assetPrefix: isGitHubPages ? `/${repositoryName}` : undefined,
  trailingSlash: true
};

export default nextConfig;
