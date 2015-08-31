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

    constructor() {
        super();
        this.game = Entity.Game.getInstance();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initGame, this);
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }

    private initGame() {
        egret.Profiler.getInstance().run();
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
        this.player.y = this.stageH - 300;

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
            if(this.game.obstacleManager.isOverlapping(this.player)) {
                this.game.gameOver();
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                _hmt.push(["_trackEvent", "game", "state", "over"]);
                return;
            }
            this.player.updatePosition(advancedTime);
            this.game.obstacleManager.updatePool(advancedTime);
            this.bg.updateBgPosition(advancedTime);
        }
    }
}