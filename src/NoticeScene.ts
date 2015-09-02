/**
 * Created by Rain on 2015/8/31.
 */
class NoticeScene extends egret.DisplayObjectContainer {
    private stageH:number;
    private stageW:number;
    private bgImage:egret.Bitmap;
    private rootStage:egret.Stage;

    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initNotice, this);
    }

    private initNotice() {
        egret.Profiler.getInstance().run();
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;

        //背景图片
        this.bgImage = new egret.Bitmap();
        this.bgImage.texture = RES.getRes("noticeBg");
        this.bgImage.width = this.stageW;
        this.bgImage.height = this.stageH;
        this.addChild(this.bgImage);
        console.log("add notice bg");

        //返回按钮
        var backMenuItem:BitmapMenuItem = new BitmapMenuItem("backMenu", "ImageSheet.leftButton", this.onMenuItemClick, this);
        this.addChild(backMenuItem);
        backMenuItem.x = this.stageW / 2;
        backMenuItem.y = this.stageH / 2 - 150;
    }

    private onMenuItemClick(name:string) {
        switch(name) {
            case "backMenu":
                //var main = new Main();
                //egret.Tween.get(main).to({x : 0}, 200).call(this.onAnimationEnd, this);
                //egret.Tween.get(this).to({x : -this.stageW}, 200);
                break;
        }
    }

    private onAnimationEnd() {
        this.rootStage.removeChild(this);
    }
}