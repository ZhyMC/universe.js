import {DBType,DBConfig} from "universe.js";

const DBConfig : DBConfig = [
    {
        db:DBType.IndexedDB,
        options:"./worker/indexeddb.worker.js"
    }
]


export default DBConfig;
