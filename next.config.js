module.exports = {
  async redirects() {

    return [
      {
        source: '/:id',
        destination: '/api/tiniurl/:id',
        permanent: true,
      },
    ]
  },
}