/**
 * Created by Mr.Lan on 2015/8/28.
 */
var ObjectPool = (function () {
    function ObjectPool() {
        this._pool = {};
        this._list = [];
    }
    var __egretProto__ = ObjectPool.prototype;
    __egretProto__.updatePool = function (advancedTime) {
        var list = this._list.concat();
        for (var i = 0, length = list.length; i < length; i++) {
            var obj = list[i];
            obj.onEnterFrame(advancedTime);
        }
    };
    __egretProto__.createObject = function (classFactory, x, y) {
        var result;
        var key = classFactory.key;
        var arr = this._pool[key];
        if (arr != null && arr.length) {
            result = arr.shift();
        }
        else {
            result = new classFactory();
            result.key = key;
        }
        result.onCreate(x, y);
        this._list.push(result);
        return result;
    };
    __egretProto__.destroyObject = function (obj) {
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
    };
    ObjectPool.getInstance = function () {
        if (ObjectPool.instance == null) {
            ObjectPool.instance = new ObjectPool();
        }
        return ObjectPool.instance;
    };
    return ObjectPool;
})();
ObjectPool.prototype.__class__ = "ObjectPool";
