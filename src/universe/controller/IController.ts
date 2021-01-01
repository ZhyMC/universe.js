interface IController{
    getName() : string;
    start() : Promise<void>;
    doTick(tick:number) : Promise<void>;
}
export default IController;
