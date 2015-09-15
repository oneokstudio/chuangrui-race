/**
 * Created by Sunday on 2015/9/14.
 */
class AdSceneLayer extends egret.DisplayObjectContainer {
    private static _instance:AdSceneLayer;
    private maskLayer:egret.Shape;
    private adBg:egret.Bitmap;
    private adButton:BitmapMenuItem;
    private stageW:number;
    private stageH:number;

    constructor() {
        super();
        this.maskLayer = new egret.Shape();
        this.adBg = new egret.Bitmap();
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

        //TE简介弹框
        this.adBg.texture = RES.getRes("ad");
        this.adBg.anchorX = 0.5;
        this.adBg.width = 517;
        this.adBg.height = 284;
        this.adBg.x = this.stageW / 2;
        this.adBg.y = 200;
        this.addChild(this.adBg);

        //关闭按钮
        this.adButton = new BitmapMenuItem("adButton", "", function () {
            //egret.MainContext.instance.stage.addChild(this.endScene);
            //TODO:获取排名顺序
            this.parent.removeChild(this);
        }, this);
        this.adButton.width = 290;
        this.adButton.height = 100;
        this.adButton.x = this.stageW / 2;
        this.adButton.y = 400;
        this.addChild(this.adButton);
    }

    public static getInstance():AdSceneLayer {
        if(AdSceneLayer._instance == null) {
            AdSceneLayer._instance = new AdSceneLayer();
        }
        return AdSceneLayer._instance;
    }
}