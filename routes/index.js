const megaverseRoutes = require('./megaverse');

const router = (app) => {
  app.use(megaverseRoutes);
};

module.exports = router;