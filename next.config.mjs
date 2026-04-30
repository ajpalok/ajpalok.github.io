/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'export',
   
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,
 
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  skipTrailingSlashRedirect: true,
 
  // Optional: Change the output directory `out` -> `dist`
  distDir: 'dist',

  // Optional: Disable image optimization and use unoptimized images
  images: { 
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        pathname: '/**',
      },
    ],
  },

  // Allow HMR from localhost in development
  allowedDevOrigins: ['127.0.0.1', 'localhost']
};

export default nextConfig;
