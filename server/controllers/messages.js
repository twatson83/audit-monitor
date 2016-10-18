import logger from '../utils/logger';
import { find, getById } from '../models/message';

/**
 *
 * @param {Object} req
 * @param {Object} res
 */
export async function getMessage(req, res) {
    let id = req.params.id;
    try {
        let instance = await getById(id);
        res.json(instance);
    } catch (ex) {
        logger.log("error", "Error fetching message by id", ex);
        res.status(500).json(ex.message);
    }
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 */
export async function getMessages(req, res) {
    let page = parseInt(req.query.page),
        pageSize = parseInt(req.query.pageSize),
        start = req.query.start ? req.query.start : undefined,
        end = req.query.end ? req.query.end : undefined,
        query = req.query.query,
        sort = req.query.sort,
        sortDirection = req.query.sortDirection;
    try {
        let instances = await find(page, pageSize, start, end, query, sort, sortDirection);
        res.json(instances);
    } catch (ex) {
        logger.log("error", "Error fetching audit messages", ex);
        res.status(500).json(ex.message);
    }
}