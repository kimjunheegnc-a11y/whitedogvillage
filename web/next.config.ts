import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const remotePatterns: NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
> = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl && !supabaseUrl.includes("YOUR_PROJECT")) {
  try {
    const host = new URL(supabaseUrl).hostname;
    remotePatterns.push({
      protocol: "https",
      hostname: host,
      pathname: "/storage/v1/object/public/**",
    });
  } catch {
    /* invalid URL at build time */
  }
}

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: { remotePatterns },
};

export default nextConfig;
