import {guid} from "../utils/utils";

export function audit(){
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
        activeSession: null,
        activeMessage: null,
        messages: [],
        columns: {
            "TypeName": {
                Display: "Type",
                type: "link"
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