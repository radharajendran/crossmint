const router = require('express-promise-router');  
const controller = require('../controller/megaverse');
const schemaValidator = require('../middlewares/SchemaValidator');

const megaverseRouter = new router();
const validateRequest = schemaValidator(true);

megaverseRouter.put('/clear_megaverse', controller.clearMegaVerse);
megaverseRouter.post('/create_megaverse', validateRequest, controller.createMegaverse);
megaverseRouter.put('/update_megaverse/:type', controller.updateLocalMegaverse);

module.exports = megaverseRouter;
