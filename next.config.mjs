/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["pages", "utils"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/product-images/**/**",
      },
      {
        protocol: "https",
        hostname: "robohash.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "toppng.com",
        port: "",
        pathname: "/uploads/preview/**",
      },
    ],
  },
  
};



export default nextConfig;



// module.exports = {
//   webpackDevMiddleware: (config) => {
//     // Enable the webpack dev middleware which allows you to use a proxy
//     config.proxy = {
//       "/api": {
//         target: "https://hrmsoftware.onrender.com",
//         pathRewrite: {"^/api": "/api"},
//         changeOrigin: true,
//       },
//     };
//     return config;
//   },
// };