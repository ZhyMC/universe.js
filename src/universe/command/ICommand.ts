interface ICommand{
    getCommand() : string;
    isActive() : boolean;
}

export default ICommand;