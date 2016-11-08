import logger from '../../utils/logger';
import { find } from '../../models/endpoint';

/**
 * Finds endpoints using search parameters passed in query string
 * @param {Object} req
 * @param {Object} res
 */
export async function getEndpoints(req, res) {
    let query = req.query.query,
        sort = req.query.sort,
        sortDirection = req.query.sortDirection;
    try {
        let endpoints = await find(query, sort, sortDirection);
        res.json(endpoints);
    } catch (ex) {
        logger.log("error", "Error fetching endpoints", ex);
        res.status(500).json(ex.message);
    }
}
