importScripts("https://unpkg.com/dexie@3.0.3/dist/dexie.js");

class WebIndexedDB{
    dexie;
    stores = {};
    changes = [];
    events_buffer = [];
    timer = -1;

    constructor(){
        this.dexie = new Dexie("universe");
        this.timer = setInterval(()=>{
            if(this.events_buffer.length<=0)
                return;
            self.postMessage(this.events_buffer);
            this.events_buffer = [];
        },3);
    }
    close(){
        clearInterval(this.timer);
    }
    async open(){
        if(this.dexie.isOpen())
            throw new Error("this db is already open");

        await this.dexie.delete();

        this.dexie.version(1).stores(this.stores);
        await this.dexie.open();

        let stores = Object.keys(this.stores);
        for(let store of stores){
            this.dexie.table(store).hook("creating",(primKey,obj)=>{
                this.emitChange("I",store,obj,primKey);
            });
            this.dexie.table(store).hook("updating",(mods,primKey,obj)=>{
                this.emitChange("U",store,obj,primKey);
            });
            this.dexie.table(store).hook("deleting",(primKey,obj)=>{
                this.emitChange("D",store,obj,primKey);
            });
            
        }
    };
    emitChange(operation,store,obj,primKey){
        this.events_buffer.push({eventname:"change",data:{
            sheet:store,
            operation,
            is:operation != "D",
            unikey:store+'#'+primKey,
            row:obj
        }})
    }
    async createSheet(sheet, indexes, column) {
        let indexed = ["++id","&key"];
        indexes = indexes.filter((x)=>(x!="key"));
        indexed.push(...indexes);

        this.stores[sheet] = indexed.join(",");
    }
    find(sheet, condi) {
        return this.dexie.table(sheet).where(condi).toArray();
    }
    findOne(sheet, condi){
        return this.dexie.table(sheet).where(condi).first();
    }
    async insertMany(sheet, rows) {
        await this.dexie.table(sheet).bulkPut(rows);
        
    }
    async insertOne(sheet, row) {
        
        let num = await this.dexie.table(sheet).put(row,"id");
        return num.toString();
    }
    async has(sheet, condi){
        let count = await this.dexie.table(sheet).where(condi).count();
        return count > 0;
    }
    async findAndRemove(sheet, condi){
        await this.dexie.table(sheet).where(condi).delete();
    }
    async findAndUpdate(sheet, condi, delta) {
        await this.dexie.table(sheet).where(condi).modify(delta);
    }
    getDeltaChanges(sheets = []) {
        return this.changes.filter((x)=>(sheets.indexOf(x.sheet)!=-1))
    }
    clearChanges() {
        this.changes = [];
    }

}
(()=>{
    const db = new WebIndexedDB();

    self.onmessage = async ({data})=>{
        try{
            let msg = {
                eventname:"invoke",
                ok : true,
                callid:data.callid,
                data : await db[data.method](...data.params)
            }
            self.postMessage([msg]);
        }catch(err){
            self.postMessage([{ok:false,callid:data.callid,data:err.stack}]);
        }
        
    }
    
})();