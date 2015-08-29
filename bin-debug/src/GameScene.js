/**
 * Created by Mr.Lan on 2015/8/25.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.obstacleManager = Controller.ObstacleManager.getInstance();
        this.timer = new egret.Timer(500, 0);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initGame, this);
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.produceObstacle, this);
    }
    var __egretProto__ = GameScene.prototype;
    __egretProto__.initGame = function () {
        egret.Profiler.getInstance().run();
        //bg
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var bgShape = new egret.Shape();
        bgShape.graphics.beginFill(0xe8e8e8, 0.6);
        bgShape.graphics.drawRect(0, 0, stageW, stageH);
        bgShape.graphics.endFill();
        this.addChild(bgShape);
        //playscene
        this.PlayScene = new egret.DisplayObjectContainer();
        this.player = new Entity.Player();
        this.PlayScene.addChild(this.player);
        this.player.anchorX = this.player.anchorY = 0.5;
        this.player.x = egret.MainContext.instance.stage.stageWidth / 2;
        this.player.y = egret.MainContext.instance.stage.stageHeight - 160;
        this.addChild(this.PlayScene);
        this.obstacleManager.setScene(this.PlayScene);
        //ui
        this.UIScene = UIScene.getInstance();
        this.addChild(this.UIScene);
        this.game = Entity.Game.getInstance();
        this.game.state = true;
        this.timer.start();
    };
    __egretProto__.produceObstacle = function () {
        this.obstacleManager.produce();
    };
    __egretProto__.onEnterFrame = function (advancedTime) {
        if (this.game.state) {
            this.player.updatePosition(advancedTime);
            this.obstacleManager.updatePool(advancedTime);
            if (this.obstacleManager.isOverlapping(this.player)) {
                this.game.state = false;
                this.timer.stop();
                _hmt.push(["_trackEvent", "game", "state", "over"]);
            }
        }
    };
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
