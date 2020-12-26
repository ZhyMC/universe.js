import LokiDB from "lokijs";
import { EventEmitter } from "events"

interface IModel extends EventEmitter{
    setDataModel(db:LokiDB):void;
    getName():string;
}

export default IModel;
