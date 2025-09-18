import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
   output: isProd ? "export" : undefined,
   basePath: isProd ? "/eleven-front" : undefined,
   assetPrefix: isProd ? "/eleven-front/" : undefined,
   images: {
      unoptimized: isProd ? true : false,
   },
};

export default withNextIntl(nextConfig);
