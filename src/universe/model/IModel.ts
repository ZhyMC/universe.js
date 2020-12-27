import { EventEmitter } from "events"

interface IModel extends EventEmitter{
    getName():string;
}

export default IModel;
