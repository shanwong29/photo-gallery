const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.API_HOST || "http://server:5005",
      changeOrigin: true
    })
  );
};
