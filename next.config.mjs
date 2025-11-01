/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname :'img.clerk.com' ,
          
          },
          {
            hostname: 'localhost',
          
          } ,
       
     
  
        ],
      },
      typescript: {
        ignoreBuildErrors: true
      },
      eslint: {
        ignoreDuringBuilds: true
      }
    
};

export default nextConfig;
