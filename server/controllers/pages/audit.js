import logger from '../../utils/logger';
import { find } from '../../models/message';
import { handleRender } from "../../views/page";
import MessagesPageContainer from '../../../client/app/containers/MessagesPageContainer';
import rootReducer from "../../../client/app/reducers";
import { createStore } from 'redux'

/**
 * Renders audit page.
 * @param {Object} req
 * @param {Object} res
 */
export async function getAuditPage(req, res) {
    const store = createStore(rootReducer);
    let state = store.getState();

    let page = parseInt(req.body.page) || state.audit.requestOptions.page,
        pageSize = parseInt(req.body.pageSize) || state.audit.requestOptions.pageSize,
        start = req.body.start ? req.body.start : undefined,
        end = req.body.end ? req.body.end : undefined,
        query = req.body.query,
        sort = req.body.sort || state.audit.requestOptions.sort,
        sortDirection = req.body.sortDirection || state.audit.requestOptions.sortDirection;
    let messages;
    try {
        messages = await find(page, pageSize, start, end, query, sort, sortDirection);
    } catch (ex) {
        logger.log("error", "Error fetching audit messages", ex);
        res.status(500).json(ex.message);
    }

    let hasMorePages =  messages.length > state.audit.requestOptions.pageSize;
    messages.pop();
    state.audit.messages = messages;
    state.audit.requesting = false;
    state.audit.requestOptions = {
        page, pageSize, start, end, query,
        sort, sortDirection, hasMorePages,
        started : true,
        serverRendered: true
    };

    handleRender(req, res, MessagesPageContainer, state, store);
}
