/**
 * Created by Mr.Lan on 2015/9/2.
 */
class EndScene extends egret.DisplayObjectContainer {
    private maskLayer:egret.Shape;
    private stageW:number;
    private stageH:number;
    private rankBg:egret.Bitmap;
    private static _instance:EndScene;
    private textField:egret.TextField;

    constructor() {
        super();

        this.maskLayer = new egret.Shape();
        this.rankBg = new egret.Bitmap();
        this.textField = new egret.TextField();
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

        var layoutWidth = this.stageW * 0.9;
        //排行榜背景
        this.rankBg.texture = RES.getRes("rank");
        this.rankBg.anchorX = 0.5;
        this.rankBg.x = this.stageW / 2;
        this.rankBg.y = 40;
        var rounds = new egret.Rectangle();
        this.rankBg.getBounds(rounds, true);
        rounds.width = layoutWidth;
        rounds.height = this.stageH * 0.6;
        rounds.y = 0;
        rounds.x = (710 - layoutWidth) / 2;
        this.rankBg.mask = rounds;
        this.addChild(this.rankBg);

        //白色底板
        var bgShape = new egret.Shape();
        bgShape.graphics.beginFill(0xffffff, 0.8);
        bgShape.graphics.drawRect(0, 0, layoutWidth, 150);
        bgShape.graphics.endFill();
        bgShape.anchorX = 0.5;
        bgShape.x = this.stageW / 2;
        bgShape.y = 40 + this.stageH * 0.6;
        this.addChild(bgShape);

        //黑字说明文字
        this.textField.size = 30;
        this.textField.textColor = 0x000000;
        this.textField.text ="截至至10月17日0:00，最终排名前20名选手获得小米手环一只，排名前100名选手获得车队帽子一顶。" +
            "请关注TE 微信的中奖信息，为FanBoosts加油！";
        this.textField.width = layoutWidth - 20;
        this.textField.anchorX = 0.5;
        this.textField.lineSpacing = 5;
        this.textField.x = this.stageW / 2;
        this.textField.y = bgShape.y + 10;
        this.addChild(this.textField);

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