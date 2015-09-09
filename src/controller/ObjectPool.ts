/**
 * Created by Mr.Lan on 2015/8/28.
 */
class ObjectPool {
    public updatePool(advancedTime:number):void {
        var list = this._list.concat();
        for (var i = 0 , length = list.length; i < length; i++) {
            var obj:Entity.Obstacle = list[i];
            obj.onEnterFrame(advancedTime);
        }
    }

    private _pool = {};

    public _list:Array<any> = [];

    public createObject(classFactory:any, x:number, y:number):Entity.Obstacle {
        var result;
        var key = classFactory.key;
        var arr = this._pool[key];
        if (arr != null && arr.length) {
            result = arr.shift();
        } else {
            result = new classFactory();
            result.key = key;
        }
        result.onCreate(x, y);
        this._list.push(result);
        return result;
    }

    public destroyObject(obj:any) {
        var key = obj.key;
        if (this._pool[key] == null) {
            this._pool[key] = [];
        }
        this._pool[key].push(obj);
        obj.onDestroy();
        var index = this._list.indexOf(obj);
        if (index != -1) {
            this._list.splice(index, 1);
        }
    }

    public clearPool() {
        this._list = null;
        this._list = [];
    }

    private static instance:ObjectPool;

    public static getInstance():ObjectPool {
        if (ObjectPool.instance == null) {
            ObjectPool.instance = new ObjectPool();
        }
        return ObjectPool.instance;
    }
}