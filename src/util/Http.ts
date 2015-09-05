/**
 * Created by Sunday on 15/9/5.
 */
module Http {
    export function get(url, data, callback) {
        //创建GET请求
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, onGetComplete, this);

        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.GET;
        request.data = new egret.URLVariables(data);
        loader.load(request);

        //GET请求完成
        function onGetComplete(event:egret.Event):void
        {
            var loader:egret.URLLoader = <egret.URLLoader> event.target;
            var res:egret.URLVariables = loader.data;
            if (callback) {
                callback(res);
            }
        }
    }

    export function post(url, data, callback) {
        //创建POST请求
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, onPostComplete, this);

        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables(data);
        loader.load(request);

        //POST请求完成
        function onPostComplete(event:egret.Event):void
        {
            var loader:egret.URLLoader = <egret.URLLoader> event.target;
            var res:egret.URLVariables = loader.data;

            if (callback) {
                callback(res);
            }
        }
    }
}