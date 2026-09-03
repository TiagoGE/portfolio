import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: ships plain HTML/CSS/JS, hosts anywhere (incl. Azure Static Web Apps).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
