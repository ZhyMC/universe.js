import * as Three from "three";
import * as ReactThree from 'react-three-fiber'

import React from "react";
import { IGame } from "../game/IGame";
import { IRenderer } from "./IRenderer";
import { UIRendererComponent } from "./UIRendererComponent"

export class CanvasRenderer implements IRenderer{
    private game : IGame ;
    private canvas : HTMLCanvasElement
    private scene : Three.Scene;
    private rendering : boolean = false;
    private renderer : Three.WebGLRenderer;
    constructor(canvas:HTMLCanvasElement,game:IGame,ui:Three.Mesh){
        this.canvas = canvas;
        this.game = game;
        this.scene = new Three.Scene();
        this.renderer = new Three.WebGLRenderer({
            canvas:this.canvas
        });

    }
    private render(){
        if(!this.rendering)
            return;
        
        ReactThree.render(<UIRendererComponent game={this.game} />,this.scene);
        this.renderer.render(this.game.getScene(),this.game.getCamera());
        requestAnimationFrame(this.render.bind(this));
    }
    startRender(){
        if(this.rendering)
            return;
        

        this.rendering = true;
        requestAnimationFrame(this.render.bind(this));
    }
    close(){
        this.rendering = false;
    }

}