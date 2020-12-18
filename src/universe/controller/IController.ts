interface IController{
    getName() : string;
    start() : void;
    doTick(tick:number) : void;
}
export default IController;
