import Defer from "./Defer";
enum LoaderState{
    READY,
    LOADED
};

class HTMLImageLoader{
    private url:string;
    private image:HTMLImageElement;
    private state:LoaderState;
    private loaded_defer : Defer<void>;

    constructor(url:string){
        this.url = url;
        this.image = new Image();
        this.image.onload = this.onLoad.bind(this);
        this.image.src = this.url;
        this.loaded_defer = new Defer<void>()

        this.state = LoaderState.READY;
    }
    private onLoad(){
        this.state = LoaderState.LOADED;
    }
    getURL(){
        return this.url;
    }
    private async whenLoaded(){
        if(this.state == LoaderState.LOADED)
            return;

        await this.loaded_defer.promise;
    }
    async getImage(){
        await this.whenLoaded();
        return this.image;
    }

}

export default HTMLImageLoader;