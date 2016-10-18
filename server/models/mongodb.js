import config from "../config";
import { MongoClient } from 'mongodb';

let db = null;
let connect = function() {
    return db || MongoClient.connect(config.mongodb.url, config.mongodb.options);
};

export default connect;
