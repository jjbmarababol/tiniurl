/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/public/favicon.ico',
        destination: '/images/favicon.ico',
        permanent: true,
      },
      {
        source: '/:id',
        destination: '/api/urls/:id',
        permanent: true,
      },
    ];
  },
};
