importScripts("https://unpkg.com/dexie@3.0.3/dist/dexie.js");

class WebIndexedDB{
    dexie;
    stores = {};
    changes = [];

    constructor(){
        this.dexie = new Dexie("universe");
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
                this.changes.push({
                    sheet:store,
                    operation:"I",
                    row:obj
                })
            });
            this.dexie.table(store).hook("updating",(mods,primKey,obj)=>{
                this.changes.push({
                    sheet:store,
                    operation:"U",
                    row:obj
                })
            });
            this.dexie.table(store).hook("deleting",(primKey,obj)=>{
                this.changes.push({
                    sheet:store,
                    operation:"D",
                    row:obj
                })
            });
            
        }
    };
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
                ok : true,
                callid:data.callid,
                data : await db[data.method](...data.params)
            }
            self.postMessage(msg);
        }catch(err){
            self.postMessage({ok:false,callid:data.callid,data:err.stack});
        }
        
    }
    
})();