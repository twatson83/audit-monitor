import logger from '../../utils/logger';
import { find, getById, findBySession } from '../../models/error';

/**
 * Finds a single error by id
 * @param {Object} req
 * @param {Object} res
 */
export async function getError(req, res) {
    let id = req.params.id;
    try {
        let instance = await getById(id);
        res.json(instance);
    } catch (ex) {
        logger.log("error", "Error fetching error by id", ex);
        res.status(500).json(ex.message);
    }
}

/**
 * Finds errors using search parameters passed in query string
 * @param {Object} req
 * @param {Object} res
 */
export async function getErrors(req, res) {
    let page = parseInt(req.query.page),
        pageSize = parseInt(req.query.pageSize),
        start = req.query.start ? req.query.start : undefined,
        end = req.query.end ? req.query.end : undefined,
        query = req.query.query,
        sort = req.query.sort,
        sortDirection = req.query.sortDirection;
    try {
        let errors = await find(page, pageSize, start, end, query, sort, sortDirection);
        res.json(errors);
    } catch (ex) {
        logger.log("error", "Error fetching error messages", ex);
        res.status(500).json(ex.message);
    }
}
