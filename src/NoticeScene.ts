/**
 * Created by Rain on 2015/8/31.
 */
class NoticeScene extends egret.DisplayObjectContainer {
    private stageH:number;
    private stageW:number;
    private bgImage:egret.Bitmap;
    private noticeImage:egret.Bitmap;
    private rootStage:egret.Stage;

    constructor() {
        super();
        this.rootStage = egret.MainContext.instance.stage;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initNotice, this);
    }

    private initNotice() {
        egret.Profiler.getInstance().run();
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;

        //背景图片
        this.bgImage = new egret.Bitmap();
        this.bgImage.texture = RES.getRes("bgImage");
        this.bgImage.width = this.stageW;
        this.bgImage.height = this.stageH;
        this.bgImage.x = this.bgImage.y = 0;
        this.addChild(this.bgImage);

        //说明面板
        this.noticeImage = new egret.Bitmap();
        this.noticeImage.texture = RES.getRes("noticeBg");
        this.noticeImage.width = this.stageW * 0.875;
        this.noticeImage.height = this.stageH * 0.7125;
        this.noticeImage.x = 45;
        this.noticeImage.y = 50;
        this.addChild(this.noticeImage);

        //开始游戏按钮
        var startMenuItem:BitmapMenuItem = new BitmapMenuItem("startMenu", "ImageSheet.startButton", this.onMenuItemClick, this);
        startMenuItem.scaleX = 0.5;
        startMenuItem.scaleY = 0.5;
        startMenuItem.x = this.stageW - 170;
        startMenuItem.y = this.stageH - 100;
        this.addChild(startMenuItem);
    }

    private onMenuItemClick(name:string) {
        switch(name) {
            case "startMenu":
                var gameScene = new GameScene();
                gameScene.x = this.stageW;
                gameScene.y = 0;
                this.rootStage.addChild(gameScene);
                egret.Tween.get(gameScene).to({x : 0}, 200).call(this.onAnimationEnd, this);
                egret.Tween.get(this).to({x : -this.stageW}, 200);
                _hmt.push(["_trackEvent", "button", "click", "start"]);
                break;
        }
    }

    private onAnimationEnd() {
        this.rootStage.removeChild(this);
    }
}