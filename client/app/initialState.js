import {audit} from '../messages/initialState';
import {error} from '../errors/initialState';
import {endpoint} from '../endpoints/initialState';

export default {
    audit: audit(),
    endpoint: endpoint(),
    error: error(),
    dashboard: {
        error: error(),
        audit: audit(),
        endpoint: endpoint()
    },
    page: "home"
};
