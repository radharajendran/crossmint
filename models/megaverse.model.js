const Joi = require('joi');

const megaverse_schema = Joi.object({
    candidateId:  Joi.string().required(),
    megaverseData: Joi.array().min(1)
});

module.exports = megaverse_schema