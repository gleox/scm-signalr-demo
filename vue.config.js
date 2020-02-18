module.exports = {
  devServer: {
    progress: false,
    proxy: {
      '/signalr': {
        target: process.env.PROXY_API_URL,
        changeOrigin: true
      },
      '/api': {
        target: process.env.PROXY_API_URL,
        changeOrigin: true
      }
    }
  }
}
