interface ICommand{
    getCommand() : string;
    isActive() : boolean;
}

export {ICommand};