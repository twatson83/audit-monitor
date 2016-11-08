import connect from "./mongodb";

export async function insert(heartbeat){
    let db = await connect();
    let result = await db.collection('ServiceHeartbeats').insertOne(heartbeat);
    heartbeat._id = result.insertedId;
    return heartbeat;
}