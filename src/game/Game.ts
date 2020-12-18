import IController from "../universe/controller/IController";

class Game{
    private controller : IController;
    constructor(controller : IController){
        this.controller = controller;

    }

}

export default Game;