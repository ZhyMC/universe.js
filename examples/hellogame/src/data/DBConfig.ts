import * as Universe from "universe.js";

const DBConfig : Universe.db.DBConfig = [
    {
        db:Universe.db.DBType.IndexedDB,
        options:"./worker/indexeddb.worker.js"
    }
]


export {DBConfig};
