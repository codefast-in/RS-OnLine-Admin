/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< Updated upstream
   
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'cdn.dummyjson.com',
              port: '',
              pathname: '/product-images/**/**',
            },
            {
              protocol: 'https',
              hostname: 'robohash.org',
              port: '',
              pathname: '/**',
            },
          ],
        },
      
=======
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.dummyjson.com',
            port: '',
            pathname: '/product-images//',
          },
          {
            protocol: 'https',
            hostname: 'robohash.org',
            port: '',
            pathname: '/',
          },
          {
            protocol: 'https',
            hostname: 'github.com',
            port: '',
            pathname: '/shadcn.png',
          },
        ],
      },
    
>>>>>>> Stashed changes
};



export default nextConfig;
