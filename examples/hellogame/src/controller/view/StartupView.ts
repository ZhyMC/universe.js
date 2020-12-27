import * as Universe from "universe.js";

class StartupView extends Universe.ViewController{

    start(){
        let camera = this.viewobj.find("camera");
        camera.position.set(0,0,10)
    }
    doTick(){

    }
    
}

export default StartupView;
