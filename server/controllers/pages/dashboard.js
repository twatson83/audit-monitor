import logger from '../../utils/logger';
import { find as findAudit } from '../../models/message';
import { find as findError } from '../../models/error';
import { find as findEndpoints } from '../../models/endpoint';
import { handleRender } from "../../views/page";
import DashboardContainer from '../../../client/app/containers/DashboardContainer';
import rootReducer from "../../../client/app/reducers";
import { createStore } from 'redux'

/**
 * Renders dashboard page.
 * @param {Object} req
 * @param {Object} res
 */
export async function getDashboard(req, res) {
    const store = createStore(rootReducer);
    let state = store.getState();

    let messages;
    try {
        messages = await findAudit(
            state.dashboard.audit.requestOptions.page,
            state.dashboard.audit.requestOptions.pageSize,
            state.dashboard.audit.requestOptions.start,
            state.dashboard.audit.requestOptions.end,
            state.dashboard.audit.requestOptions.query,
            state.dashboard.audit.requestOptions.sort,
            state.dashboard.audit.requestOptions.sortDirection);
    } catch (ex) {
        logger.log("error", "Error fetching audit messages", ex);
        res.status(500).json(ex.message);
    }

    let errors;
    try {
        errors = await findError(
            state.dashboard.error.requestOptions.page,
            state.dashboard.error.requestOptions.pageSize,
            state.dashboard.error.requestOptions.start,
            state.dashboard.error.requestOptions.end,
            state.dashboard.error.requestOptions.query,
            state.dashboard.error.requestOptions.sort,
            state.dashboard.error.requestOptions.sortDirection);
    } catch (ex) {
        logger.log("error", "Error fetching error messages", ex);
        res.status(500).json(ex.message);
    }

    let endpoints;
    try {
        endpoints = await findEndpoints(
            state.dashboard.endpoint.requestOptions.query,
            state.dashboard.endpoint.requestOptions.sort,
            state.dashboard.endpoint.requestOptions.sortDirection);
    } catch (ex) {
        logger.log("error", "Error fetching endpoints", ex);
        res.status(500).json(ex.message);
    }

    let hasMorePages =  messages.length > state.dashboard.audit.requestOptions.pageSize;
    messages.pop();
    state.dashboard.audit.messages = messages;
    state.dashboard.audit.requesting = false;
    state.dashboard.audit.requestOptions.hasMorePages = hasMorePages;
    state.dashboard.audit.requestOptions.serverRendered = true;

    hasMorePages =  errors.length > state.dashboard.error.requestOptions.pageSize;
    errors.pop();
    state.dashboard.error.errors = errors;
    state.dashboard.error.requesting = false;
    state.dashboard.error.requestOptions.hasMorePages = hasMorePages;
    state.dashboard.error.requestOptions.serverRendered = true;

    let endpointObject = {};
    endpoints.forEach(e => {
        endpointObject[e.Name] = e;
    });
    state.dashboard.endpoint.endpoints = endpointObject;
    state.dashboard.endpoint.requesting = false;
    state.dashboard.endpoint.requestOptions.serverRendered = true;

    handleRender(req, res, DashboardContainer, state, store);
}
