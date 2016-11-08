import connect from "./mongodb";

export async function find(query, sort, sortDirection) {
    let db = await connect();
    let findOptions = {};

    let cursor;
    if (query !== undefined && query !== null && query !== ""){
        let queryRegex = new RegExp(query, "ig");
        findOptions.$or = [{
            "Name": queryRegex
        }];
        cursor = db.collection("Services").find(findOptions);
    } else {
        cursor = db.collection("Services").find(findOptions).sort([[sort, sortDirection ]]);
    }

    return await cursor.toArray();
}

export async function insert(endpoint){
    let db = await connect();
    let result = await db.collection('Services').insertOne(endpoint);
    endpoint._id = result.insertedId;
    return endpoint;
}

export async function exists(name){
    let db = await connect();
    console.log();
    let result = await db.collection("Services").find({
        Name: name
    }).toArray().length > 0;
    return result;
}