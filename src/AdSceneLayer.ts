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
    private panel:egret.TextField;
    private rank:number;
    private game:Entity.Game = Entity.Game.getInstance();

    constructor() {
        super();
        this.maskLayer = new egret.Shape();
        this.adBg = new egret.Bitmap();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.panel = new egret.TextField();
        this.maskLayer.graphics.beginFill(0xe98300, 0.4);
        this.maskLayer.graphics.drawRect(0, 0, this.stageW, this.stageH);
        this.maskLayer.graphics.endFill();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    public setRank(rank: number) {
        this.rank = rank;
    }

    private onAddToStage() {
        //橙色遮罩层
        this.addChild(this.maskLayer);
        this.maskLayer.touchEnabled = true;
        this.maskLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPrevent, this, true);
        this.maskLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPrevent, this, true);
        this.maskLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.onPrevent, this, true);

        //TE简介弹框
        this.adBg.texture = RES.getRes("ad");
        this.adBg.anchorX = 0.5;
        this.adBg.x = this.stageW / 2;
        this.adBg.y = 200;
        this.addChild(this.adBg);

        //分数板
        this.panel.textColor = 0xef8500;
        if(this.rank === 0) {
            this.panel.text = "您此次挑战获得" + this.game.score + "分，这次没有进入前100名，要加油哦！";
        }else {
            this.panel.text = "您此次挑战获得" + this.game.score + "分，获得的排名是" + this.rank + "，加油！";
        }
        this.panel.size = 25;
        this.panel.width = 400;
        this.panel.textAlign = "center";
        this.panel.lineSpacing = 10;
        this.panel.anchorX = 0.5;
        this.panel.x = this.stageW / 2;
        this.panel.y = 350;
        this.addChild(this.panel);

        //关闭按钮
        this.adButton = new BitmapMenuItem("adButton", "", function () {
            //egret.MainContext.instance.stage.addChild(this.endScene);
            this.parent.removeChild(this);
        }, this);
        this.adButton.width = 290;
        this.adButton.height = 100;
        this.adButton.x = this.stageW / 2;
        this.adButton.y = 500;
        this.addChild(this.adButton);
    }

    private onPrevent(event:egret.TouchEvent) {
        event.stopPropagation();
    }

    public static getInstance():AdSceneLayer {
        if(AdSceneLayer._instance == null) {
            AdSceneLayer._instance = new AdSceneLayer();
        }
        return AdSceneLayer._instance;
    }
}