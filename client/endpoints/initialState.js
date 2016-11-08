import {guid} from "../utils/utils";

export function endpoint(){
    return {
        cid: guid(),
        requesting: false,
        requestOptions: {
            sort: "Name",
            query: undefined,
            sortDirection: "asc",
            started: true
        },
        endpoints: {},
        columns: {
            "Name": {
                Display: "Name",
                type: "string"
            },
            "LatestCpu": {
                Display: "CPU",
                type: "decimal"
            },
            "LatestMemory": {
                Display: "Memory",
                type: "memory"
            }
        }
    };
}