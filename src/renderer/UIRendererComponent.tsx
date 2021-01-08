import * as React from "react";
import * as ReactDOM from "react-dom";

import * as Three from "three";
import { Canvas } from 'react-three-fiber'
import { IGame } from "../game/IGame";

export type RendererProp = {
    game : IGame,
    rendering:boolean
}

export class UIRendererComponent extends React.Component<RendererProp>{
    private canvasRef = React.createRef<HTMLCanvasElement>();
    private renderer? : Three.WebGLRenderer;
    private closed : boolean = false;

    constructor(props:RendererProp){
        super(props);
        this.request_render();
    }
    private doRender(){
        if(this.closed)
            return;

        if(this.props.rendering)
            this.renderer?.render(this.props.game.getScene(),this.props.game.getCamera());

        this.request_render();
    }
    private request_render(){
        requestAnimationFrame(this.doRender.bind(this));
    }
    componentWillUnmount(){
        this.closed = true;
    }
    componentDidMount(){
        this.renderer = new Three.WebGLRenderer({
            canvas:this.canvasRef.current as HTMLCanvasElement
        });
    }
    render(){
        return (
            <div style={{position:"absolute",userSelect:"none",width:"100%",height:"100%"}}>
                <div style={{position:"absolute"}} id="UIContainer">
                    {this.props.game.getUI()}
                </div>
                <canvas style={{width:"100%",height:"100%"}} width="960" height="540" ref={this.canvasRef} />
            </div>
        );
    }

}
