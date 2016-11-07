import {guid} from "../utils/utils";

export function error(){
    return {
        cid: guid(),
        requesting: false,
        requestOptions: {
            pageSize: 50,
            page: 1,
            start: undefined,
            end: undefined,
            sort: "TimeReceived",
            query: undefined,
            sortDirection: "desc",
            hasMorePages: false,
            started: true,
        },
        activeError: null,
        errors: [],
        columns: {
            "TypeName": {
                Display: "Type",
                type: "string"
            },
            "TimeSent": {
                Display: "Time Sent",
                type: "datetime"
            },
            "TimeReceived": {
                Display: "Time Received",
                type: "datetime"
            },
            "SourceAddress": {
                Display: "Source",
                type: "string"
            },
            "DestinationAddress": {
                Display: "Destination",
                type: "string"
            }
        }
    };
}