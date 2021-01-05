class Defer<T>{
    public resolve : (value:T)=>void = ()=>{};
    public reject : ()=>void = ()=>{};
    public promise : Promise<T>;
    constructor(){
        this.promise = new Promise<T>((resolve,reject)=>{
            this.resolve = resolve;
            this.reject = reject;
        })
    }
}

export {Defer};