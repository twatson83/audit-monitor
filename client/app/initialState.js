import {audit} from '../messages/initialState';
import {error} from '../errors/initialState';

export default {
    audit: audit(),
    error: error(),
    dashboard: {
        error: error(),
        audit: audit()
    },
    page: "home"
};
