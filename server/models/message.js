import connect from "./mongodb";
import mongo from 'mongodb';

export async function getById(id) {
    var db = await connect();
    var objectId = new mongo.ObjectID(id);
    return await db.collection("Audit").findOne({
        "_id": objectId
    });
}

export async function find(page, pageSize, start, end, query, sort, sortDirection) {
    var db = await connect();
    var findOptions = {};

    if(start !== undefined && end !== undefined){
        findOptions.TimeReceived = { "$gte": new Date(start), "$lte": new Date(end) };
    }

    var cursor;
    if (query !== undefined && query !== null && query !== ""){
        var queryRegex = new RegExp(query, "ig");
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

export async function insertBatch(messages){
    var db = await connect();
    return db.collection('Audit').insertMany(messages);
}