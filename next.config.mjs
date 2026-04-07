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
  images: { unoptimized: true } 
};

export default nextConfig;
