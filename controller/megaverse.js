const http = require('../shared/http');
const axios = require('../shared/axios');
const logger = require('../shared/logger');
const config = require('../cfg/config.json');

logger.initialize();

const megaverseController = {
    /**
    * Get user 
    * @param {JSON} res 
    * @returns JSON 
    */
    createMegaverse: async (req, res) => {
        const { candidateId, megaverseData } = req.body;

        try {
            for (let p = 0; p < megaverseData.length; p++) {

                let row = megaverseData[p];

                if (row.length) {

                    for (let c = 0; c < row.length; c++) {
                        let column = row[c];

                        if (column == 'SPACE')
                            continue;

                        if (typeof column == 'object' && column) {

                            switch (column.type) {
                                case '0':
                                    {
                                        await megaverseController.createPolyanets(p, c, candidateId);
                                    }
                                    break;
                                case '1':
                                    {
                                        await megaverseController.createSoloons(p, c, column.color, candidateId);
                                    }
                                    break;
                                case '2':
                                    {
                                        await megaverseController.createComeths(p, c, column.direction, candidateId);
                                    }
                                    break;
                            }

                        }

                    }

                }
            }

        }
        catch (e) {
            logger.logError('Error in Megaverse Creation', e)
        }

        http.send(req, res, { status: 'success', message: 'Megaverse Data Successfully updated' });
    },

    /**
     * This Method used to create polyanets images using crossmint provided api
     * @param {Number} row 
     * @param {Number} column 
     * @returns 
     */
    createPolyanets: async (row, column, candidateId) => {

        try {
            return await axios.post({
                url: config.CROSSMINT_POLYANETS_URL,
                data: {
                    row: row,
                    column: column,
                    candidateId: candidateId
                }
            })
        }
        catch (e) {
            logger.logError('Error in Polyanets creation', e)
        }
    },

    /**
     * This Method used to create soloons in crossmint provided API
     * @param {Number} row 
     * @param {Number} column 
     * @param {String} color 
     * @returns 
     */
    createSoloons: async (row, column, color, candidateId) => {
        try {
            return await axios.post({
                url: config.CROSSMINT_SOLOONS_URL,
                data: {
                    row: row,
                    column: column,
                    color: color,
                    candidateId: candidateId
                }
            })
        }
        catch (e) {
            logger.logError('Error in Soloons creation', e)
        }
    },

    /**
     * 
     * @param {Number} row 
     * @param {Number} column 
     * @param {String} direction 
     * @returns 
     */
    createComeths: async (row, column, direction, candidateId) => {
        try {
            return await axios.post({
                url: config.CROSSMINT_COMETHS_URL,
                data: {
                    row: row,
                    column: column,
                    direction: direction,
                    candidateId: candidateId
                }
            })
        }
        catch (e) {
            logger.logError('Error in Soloons creation', e)
        }
    },

    clearMegaVerse: async(req, res) => {
        const { candidateId } = req.body;

        let currentMap = await megaverseController.getCandidateMegaverse(candidateId);
        console.log(currentMap)

        let mapData = currentMap && currentMap.data && currentMap.data.map && currentMap.data.map.content;

        try {
            for (let p = 0; p < mapData.length; p++) {

                let row = mapData[p];

                if (row.length) {

                    for (let c = 0; c < row.length; c++) {
                        let column = row[c];

                        if (!column)
                            continue;

                        if (typeof column == 'object' && column) {

                            switch (column.type) {
                                case 0:
                                    {
                                        await axios.delete(
                                            {
                                                url: config.CROSSMINT_POLYANETS_URL,
                                                data: {
                                                    row: p,
                                                    column: c
                                                }
                                            })
                                    }
                                    break;
                                case 1:
                                    {
                                        await axios.delete(
                                            {
                                                url: config.CROSSMINT_SOLOONS_URL,
                                                data: {
                                                    row: p,
                                                    column: c
                                                }
                                            })
                                    }
                                    break;
                                case 2:
                                    {
                                        await axios.delete(
                                            {
                                                url: config.CROSSMINT_COMETHS_URL,
                                                data: {
                                                    row: p,
                                                    column: c
                                                }
                                            })
                                    }
                                    break;
                            }

                        }

                    }

                }
            }

            http.send(req, res, { status: 'success', message: 'Megaverse Data Successfully cleared' });

        }
        catch (e) {
            logger.logError('Error in Megaverse Clear', e)
        }

    }, 

    getCandidateMegaverse: async (candidateId) => {
        return await axios.get({ url: `${config.CANDIDATE_MAP}/${candidateId}`});
    },

    updateLocalMegaverse: async ({ candidateId, mapData }) => {

    }

}


module.exports = megaverseController;