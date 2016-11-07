import connect from "./mongodb";
import mongo from 'mongodb';

export async function getById(id) {
    let db = await connect();
    let objectId = new mongo.ObjectID(id);
    return await db.collection("Audit").findOne({
        "_id": objectId
    });
}

export async function find(page, pageSize, start, end, query, sort, sortDirection) {
    let db = await connect();
    let findOptions = {};

    if(start !== undefined && end !== undefined){
        findOptions.TimeReceived = { "$gte": new Date(start), "$lte": new Date(end) };
    }

    let cursor;
    if (query !== undefined && query !== null && query !== ""){
        let queryRegex = new RegExp(query, "ig");
        findOptions.$or = [{
            "TypeName": queryRegex
        },{
            "SourceAddress": queryRegex
        },{
            "DestinationAddress": queryRegex
        },{
            "Body": queryRegex
        }];
        cursor = db.collection("Audit").find(findOptions);
    } else {
        cursor = db.collection("Audit").find(findOptions).sort([[sort, sortDirection ]]);
    }

    return await cursor.skip((page-1)*pageSize)
        .limit(pageSize+1)
        .toArray();
}

export async function findBySession(sessionId){
    let db = await connect();
    var uuid = new mongo.Binary(new Buffer(sessionId, 'base64', 3));
    return await db.collection("Audit").findOne({ "CorrelationId": uuid });
}

export async function insert(message){
    let db = await connect();
    let result = await db.collection('Audit').insertOne(message);
    message._id = result.insertedId;
    return message;
}