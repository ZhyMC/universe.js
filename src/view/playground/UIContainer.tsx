
import * as React from "react";
import * as Mobx from "mobx";
import * as MobxReact from "mobx-react";


type UIContainerProps = {
    components: Mobx.ObservableSet<React.ReactNode>,
}


@MobxReact.observer
class UIContainerComponent extends React.Component<UIContainerProps>{
    constructor(props:UIContainerProps){
        super(props);

    }
    render(){
        return <>
            {Array.from(this.props.components.values())}
        </>;
    }

}


export {UIContainerComponent};