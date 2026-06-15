/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  // async redirects() {
  //   return [
  //     {
  //       source: "/jisc/:path*",
  //       destination: "/",
  //       permanent: false,
  //     },
  //   ];
  // },

};



export default nextConfig;
