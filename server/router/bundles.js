const { Router } = require('express');

// proxy middleware
const { createProxyMiddleware } = require('http-proxy-middleware');
const {
  service1, service2, service3, service4,
} = require('../config/services.js');

const router = Router();

// proxy request for /service1.js
router.use('/service1.js', createProxyMiddleware({
  // where the proxy request is going (target host)
  target: service1.url, // localhost:4001
  // rewrite path
  // old path: '^/bundles/service1.js'
  // new path: service1.bundle
  pathRewrite: {
    // '^/bundles/service1.js': service1.bundle,
    '^.*': service1.bundle
    // change path to app.js
  },
  // needed for virtual hosted sites
  changeOrigin: true,
}));

router.use('/service2.js', createProxyMiddleware({
  target: service2.url,
  pathRewrite: {
    // '^/bundles/service2.js': service2.bundle,
    '^.*': service2.bundle
  },
  changeOrigin: true,
}));

router.use('/service3.js', createProxyMiddleware({
  target: service3.url,
  pathRewrite: {
    // '^/bundles/service3.js': service3.bundle,
    '^.*': service3.bundle
  },
  changeOrigin: true,
}));


router.use('/service4.js', createProxyMiddleware({
  target: service4.url,
  pathRewrite: {
    '^.*': service4.bundle,
  },
  changeOrigin: true,
}));

module.exports = router;
