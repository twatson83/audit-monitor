import logger from '../../utils/logger';
import { find } from '../../models/error';
import { handleRender } from "../../views/page";
import ErrorPageContainer from '../../../client/app/containers/ErrorsPageContainer';
import rootReducer from "../../../client/app/reducers";
import { createStore } from 'redux'

/**
 * Renders errors page.
 * @param {Object} req
 * @param {Object} res
 */
export async function getErrorsPage(req, res) {
    const store = createStore(rootReducer);
    let state = store.getState();

    let page = parseInt(req.body.page) || state.error.requestOptions.page,
        pageSize = parseInt(req.body.pageSize) || state.error.requestOptions.pageSize,
        start = req.body.start ? req.body.start : undefined,
        end = req.body.end ? req.body.end : undefined,
        query = req.body.query,
        sort = req.body.sort || state.error.requestOptions.sort,
        sortDirection = req.body.sortDirection || state.error.requestOptions.sortDirection;
    let messages;
    try {
        messages = await find(page, pageSize, start, end, query, sort, sortDirection);
    } catch (ex) {
        logger.log("error", "Error fetching error messages", ex);
        res.status(500).json(ex.message);
    }

    let hasMorePages =  messages.length > state.error.requestOptions.pageSize;
    messages.pop();
    state.error.errors = messages;
    state.error.requesting = false;
    state.error.requestOptions = {
        page, pageSize, start, end, query,
        sort, sortDirection, hasMorePages,
        started : true,
        serverRendered: true
    };

    handleRender(req, res, ErrorPageContainer, state, store);
}
