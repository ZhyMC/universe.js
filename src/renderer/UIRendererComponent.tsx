import React, { useState } from "react";
import ReactDOM from "react-dom";

import * as Three from "three";
import { Canvas } from 'react-three-fiber'
import { IGame } from "../game/IGame";

export type RendererProp = {
    game : IGame,
}

export class UIRendererComponent extends React.Component<RendererProp>{
    constructor(props:RendererProp){
        super(props);
   
    }
    
    render(){
        return (
            <mesh>
                {this.props.game.getUI()}
                <primitive object = {this.props.game.getScene()} />
            </mesh>    
        );
    }

}
