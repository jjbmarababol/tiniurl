/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:id",
        destination: "/api/urls/:id",
        permanent: true,
      },
    ];
  },
};
