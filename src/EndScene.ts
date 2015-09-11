/**
 * Created by Mr.Lan on 2015/9/2.
 */
class EndScene extends egret.DisplayObjectContainer {
    private maskLayer:egret.Shape;
    private stageW:number;
    private stageH:number;
    private rankBg:egret.Bitmap;
    private wxButton:BitmapMenuItem;
    private fbButton:BitmapMenuItem;
    private reButton:BitmapMenuItem;
    private static _instance:EndScene;
    private textField:egret.TextField;
    private parentScene:GameScene;
    private endSceneLayer:EndSceneLayer;

    constructor() {
        super();

        this.maskLayer = new egret.Shape();
        this.rankBg = new egret.Bitmap();
        this.textField = new egret.TextField();
        this.endSceneLayer = EndSceneLayer.getInstance();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createScene, this);
    }

    public setParent(parent:GameScene) {
        this.parentScene = parent;
    }

    private createScene() {
        //橙色遮罩层
        this.maskLayer.graphics.beginFill(0xe98300, 0.4);
        this.maskLayer.graphics.drawRect(0, 0, this.stageW, this.stageH);
        this.maskLayer.graphics.endFill();
        this.addChild(this.maskLayer);

        //排行榜背景
        this.rankBg.texture = RES.getRes("rank");
        this.rankBg.anchorX = 0.5;
        this.rankBg.x = this.stageW / 2;
        this.rankBg.y = 40;
        var rounds = new egret.Rectangle();
        this.rankBg.getBounds(rounds, true);
        rounds.width = 580;
        rounds.height = 600;
        rounds.y = 0;
        rounds.x = 65;
        this.rankBg.mask = rounds;
        this.addChild(this.rankBg);

        //白色底板
        var bgShape = new egret.Shape();
        bgShape.graphics.beginFill(0xffffff, 0.8);
        bgShape.graphics.drawRect(0, 0, 580, 90);
        bgShape.graphics.endFill();
        bgShape.anchorX = 0.5;
        bgShape.x = this.stageW / 2;
        bgShape.y = 640;
        this.addChild(bgShape);

        //黑字说明文字
        this.textField.size = 20;
        this.textField.textColor = 0x000000;
        this.textField.text ="截至10月23日23:59，最终排名前20位的选手将获得小米手环一只，排名前100位的选手将获得车队帽子一顶。中奖信息及奖品领取，敬请关注“TE连动”微信进行查询。";
        this.textField.width = 560;
        this.textField.anchorX = 0.5;
        this.textField.lineSpacing = 5;
        this.textField.x = this.stageW / 2;
        this.textField.y = bgShape.y + 10;
        this.addChild(this.textField);

        //排行榜
        var rankScene = new RankScene();
        rankScene.width = 560;
        rankScene.height = 420;
        rankScene.anchorX = 0.5;
        rankScene.x = this.stageW / 2;
        rankScene.y = 200;
        this.addChild(rankScene);

        //底部button
        this.wxButton = new BitmapMenuItem("wxButton", "wx", this.onButtonClicked, this);
        this.fbButton = new BitmapMenuItem("fbButton", "ImageSheet.fbButton", this.onButtonClicked, this);
        this.reButton = new BitmapMenuItem("reButton", "ImageSheet.restartButton", this.onButtonClicked, this);
        this.wxButton.width = this.wxButton.height = 120;
        this.wxButton.x = 145;
        this.wxButton.y = 810;
        this.addChild(this.wxButton);
        this.fbButton.width = this.fbButton.height = 120;
        this.fbButton.x = 320;
        this.fbButton.y = 810;
        this.addChild(this.fbButton);
        this.reButton.width = this.reButton.height = 120;
        this.reButton.x = 495;
        this.reButton.y = 810;
        this.addChild(this.reButton);

        //底部label
        var textField1 = new egret.TextField();
        textField1.size = 25;
        textField1.textColor = 0xffffff;
        textField1.text ="分享到朋友圈";
        textField1.anchorX = 0.5;
        textField1.x = 145;
        textField1.y = 880;
        this.addChild(textField1);

        var textField2 = new egret.TextField();
        textField2.size = 25;
        textField2.textColor = 0xffffff;
        textField2.text ="为TE赞助车手加油";
        textField2.textAlign = "center";
        textField2.width = 120;
        textField2.anchorX = 0.5;
        textField2.x = 320;
        textField2.y = 880;
        this.addChild(textField2);

        var textField3 = new egret.TextField();
        textField3.size = 25;
        textField3.textColor = 0xffffff;
        textField3.text ="重新游戏";
        textField3.anchorX = 0.5;
        textField3.x = 495;
        textField3.y = 880;
        this.addChild(textField3);
    }

    private onButtonClicked(name) {
        switch (name) {
            case "reButton":
                this.parentScene.restartGame();
                break;
            case "fbButton":
                this.addChild(this.endSceneLayer);
                this.endSceneLayer.x = this.stageW / 2;
                this.endSceneLayer.y = this.stageH / 2;
                break;
            case "wxButton":
                //TODO:微信自定义分享
                break;
        }
    }

    public static getInstance() {
        if(EndScene._instance == null) {
            EndScene._instance = new EndScene();
        }
        return EndScene._instance;
    }
}