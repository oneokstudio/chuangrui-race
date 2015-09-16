/**
 * Created by Sunday on 2015/9/14.
 */
class ShareLayer extends egret.DisplayObjectContainer {
    private static _instance:ShareLayer;
    private maskLayer:egret.Shape;
    private shareBg:egret.Bitmap;
    private stageW:number;
    private stageH:number;

    constructor() {
        super();
        this.maskLayer = new egret.Shape();
        this.shareBg = new egret.Bitmap();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        //橙色遮罩层
        this.maskLayer.graphics.beginFill(0xe98300, 0.4);
        this.maskLayer.graphics.drawRect(0, 0, this.stageW, this.stageH);
        this.maskLayer.graphics.endFill();
        this.addChild(this.maskLayer);
        this.maskLayer.touchEnabled = true;
        this.maskLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.parent.removeChild(this);
        }, this, true);
        this.maskLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPrevent, this, true);
        this.maskLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.onPrevent, this, true);

        this.shareBg.texture = RES.getRes("shareText");
        this.shareBg.anchorX = 0.5;
        this.shareBg.width = this.stageW * 0.8;
        //this.shareBg.height = 284;
        this.shareBg.x = this.stageW / 2;
        this.shareBg.y = 30;
        this.addChild(this.shareBg);
    }

    private onPrevent(event:egret.TouchEvent) {
        event.stopPropagation();
    }

    public static getInstance():ShareLayer {
        if(ShareLayer._instance == null) {
            ShareLayer._instance = new ShareLayer();
        }
        return ShareLayer._instance;
    }
}