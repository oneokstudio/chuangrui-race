/**
 * Created by Mr.Lan on 2015/9/2.
 */
class EndScene extends egret.DisplayObjectContainer {
    private maskLayer:egret.Shape;
    private stageW:number;
    private stageH:number;
    private static _instance:EndScene;

    constructor() {
        super();

        this.maskLayer = new egret.Shape();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createScene, this);
    }

    private createScene() {
        //橙色遮罩层
        this.maskLayer.graphics.beginFill(0xe98300, 0.4);
        this.maskLayer.graphics.drawRect(0, 0, this.stageW, this.stageH);
        this.maskLayer.graphics.endFill();
        this.addChild(this.maskLayer);

        //排行榜
        //var rankScene = new RankScene();
        //rankScene.width = this.stageW * 0.8;
        //rankScene.anchorX = rankScene.anchorY = 0.5;
        //rankScene.x = this.stageW / 2;
        //rankScene.y = this.stageH / 2;
        //this.addChild(rankScene);
    }

    public static getInstance() {
        if(EndScene._instance == null) {
            EndScene._instance = new EndScene();
        }
        return EndScene._instance;
    }
}