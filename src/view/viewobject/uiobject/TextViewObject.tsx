import * as React from "react";
import * as Mobx from "mobx";
import * as MobxReact from "mobx-react";

import {UIViewObject} from "./UIViewObject"

@MobxReact.observer
class ObserverComponent extends React.Component<any>{
    render(){
        return <div style={{textAlign:"center",width:"100%"}}>
            {
                this.props.store.text
            }
        </div>;
    }
}

export class TextViewObject extends UIViewObject{
    private store = Mobx.observable<any>({text:"123"});

    constructor(){
        super();
        
    }
    @Mobx.action
    setText(text:string){
        this.store.text = text;

    }
    get ui(){
        return (
            <ObserverComponent key="" store={this.store} />        
        );
    }
}

