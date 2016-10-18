export default {
    audit: {
        requesting: false,
        requestOptions: {
            pageSize: 50,
            page: 1,
            start: undefined,
            end: undefined,
            sort: "TimeReceived",
            query: undefined,
            sortDirection: "desc",
            hasMorePages: false
        },
        messages: [],
        columns: {
            "TypeName": {
                Display: "Type"
            },
            "TimeSent":{
                Display: "Time Sent"
            },
            "TimeReceived": {
                Display: "Time Received"
            },
            "SourceAddress": {
                Display: "Source"
            },
            "DestinationAddress":{
                Display: "Destination"
            }
        }
    },
    page: "home"
};
