import logger from '../../utils/logger';
import { find } from '../../models/endpoint';
import { handleRender } from "../../views/page";
import EndpointsPageContainer from '../../../client/app/containers/EndpointsPageContainer';
import rootReducer from "../../../client/app/reducers";
import { createStore } from 'redux'

/**
 * Renders errors page.
 * @param {Object} req
 * @param {Object} res
 */
export async function getEndpointsPage(req, res) {
    const store = createStore(rootReducer);
    let state = store.getState();

    let query = req.body.query,
        sort = req.body.sort || state.endpoint.requestOptions.sort,
        sortDirection = req.body.sortDirection || state.endpoint.requestOptions.sortDirection,
        endpoints;
    try {
        endpoints = await find(query, sort, sortDirection);
    } catch (ex) {
        logger.log("error", "Error fetching endpoints", ex);
        res.status(500).json(ex.message);
    }

    let endpointObject = {};
    endpoints.forEach(e => {
        endpointObject[e.Name] = e;
    });

    state.endpoint.endpoints = endpointObject;
    state.endpoint.requesting = false;
    state.endpoint.requestOptions = {
        query, sort, sortDirection, started : true,
        serverRendered: true
    };

    handleRender(req, res, EndpointsPageContainer, state, store);
}
