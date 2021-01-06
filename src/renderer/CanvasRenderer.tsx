import * as Three from "three";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { IGame } from "../game/IGame";
import { IRenderer } from "./IRenderer";
import { UIRendererComponent } from "./UIRendererComponent"

export class CanvasRenderer implements IRenderer{
    private game : IGame ;
    private root : HTMLElement

    constructor(root:HTMLElement,game:IGame){
        this.root = root;
        this.game = game;
    }

    startRender(){
    
        
        ReactDOM.render(
            <UIRendererComponent game={this.game} rendering={true} />
        ,this.root);

    }
    close(){
        
    }

}