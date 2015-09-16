/**
 * Created by Mr.Lan on 2015/8/25.
 */
class GameScene extends egret.DisplayObjectContainer {
    private bg:Entity.Road;
    private UIScene:UIScene;
    private PlayScene;
    private player;
    private game:Entity.Game;
    private stageH:number;
    private stageW:number;
    //private adSceneLayer:AdSceneLayer;
    private endScene:EndScene;

    constructor() {
        super();
        this.game = Entity.Game.getInstance();
        //this.adSceneLayer = AdSceneLayer.getInstance();
        this.endScene = EndScene.getInstance();
        this.endScene.setParent(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initGame, this);
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }

    public restartGame() {
        this.removeChildren();
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
        this.initGame();
    }

    public initGame() {
        //egret.Profiler.getInstance().run();
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;

        //背景图片
        this.bg = new Entity.Road();
        this.bg.x = 0;
        this.bg.y = -this.stageH;
        this.addChild(this.bg);

        //playscene
        this.PlayScene = new egret.DisplayObjectContainer();
        this.player = new Entity.Player();
        this.PlayScene.addChild(this.player);
        this.player.anchorX = this.player.anchorY = 0.5;
        this.player.x = this.stageW / 2;
        this.player.y = this.stageH - 400;

        this.addChild(this.PlayScene);
        this.game.obstacleManager.setScene(this.PlayScene);

        //ui
        this.UIScene = UIScene.getInstance();
        this.addChild(this.UIScene);

        //开始
        this.game.gameStart();
    }

    public onEnterFrame(advancedTime:number):void {
        if(this.game.state) {
            this.player.op(this.game.obstacleManager.isOverlapping(this.player));
            this.player.updatePosition(advancedTime);
            this.UIScene.updateUIText(this.game.score, this.game.time);
            this.game.obstacleManager.updatePool(advancedTime);
            this.bg.updateBgPosition(advancedTime);
            if(this.game.time >= 50) {
                this.game.gameOver();
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                _hmt.push(["_trackEvent", "game", "state", "over"]);


                Global.share.toWeiXin(
                    '我在 TE 赛车游戏里跑出了' + this.game.score + '分的成绩！敢来挑战吗？',
                    '丰富奖品等你来~',
                    'http://studio.windra.in/chuangrui-race/',
                    'http://studio.windra.in/chuangrui-race/racing.png',
                    0
                );

                var me = this;
                Http.post("http://studio.windra.in/chuangrui-race/backend/submit_score.php",
                    "openid=" + location.search.substring(8) +
                    "&score=" + this.game.score
                , function(data) {
                    me.addChild(me.endScene);
                });
            }
        }
    }
}