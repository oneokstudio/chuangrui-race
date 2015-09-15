/**
 * Created by Sunday on 5/9/15.
 * 游戏公共方法
 */

module Global {
    //分享
    export var share:Share;

    //初始化
    export function init():void {
        Global.share = new Share();
    }

    //手机旋转适配
    //注意：
    //在egret_loader.js中，rootContainer要放startGame在外定义
    //具体旋转数值自己修改
    //貌似不完善
    export function rotationResize(isRotation:boolean = false):void{
        if(isRotation){
            egret.StageDelegate.getInstance().setDesignSize(800, 480);
            window["rootContainer"].rotation = 90;
            window["rootContainer"].x = egret.MainContext.instance.stage.stageWidth;
        }else{
            egret.StageDelegate.getInstance().setDesignSize(480, 800);
            window["rootContainer"].rotation = 0;
            window["rootContainer"].x = 0;
        }
    }

    //获取用户信息
    export function getUserInfo():void {
        Http.get({}, {}, function () {

        })
    }
}