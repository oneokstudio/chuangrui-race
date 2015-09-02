/**
 * Created by Mr.Lan on 2015/8/25.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        egret.StageDelegate.getInstance().setDesignSize(808, 799);
        this.game = Entity.Game.getInstance();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initGame, this);
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }
    var __egretProto__ = GameScene.prototype;
    __egretProto__.initGame = function () {
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
    };
    __egretProto__.onEnterFrame = function (advancedTime) {
        if (this.game.state) {
            if (this.game.obstacleManager.isOverlapping(this.player)) {
                this.game.gameOver();
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                _hmt.push(["_trackEvent", "game", "state", "over"]);
                return;
            }
            this.player.updatePosition(advancedTime);
            this.game.obstacleManager.updatePool(advancedTime);
            this.bg.updateBgPosition(advancedTime);
        }
    };
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
