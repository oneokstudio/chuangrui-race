/**
 * Created by Mr.Lan on 2015/8/25.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initScene, this);
    }
    var __egretProto__ = GameScene.prototype;
    __egretProto__.initScene = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var bgShape = new egret.Shape();
        bgShape.graphics.beginFill(0xe8e8e8, 0.6);
        bgShape.graphics.drawRect(0, 0, stageW, stageH);
        bgShape.graphics.endFill();
        this.addChild(bgShape);
        this.startGame();
    };
    __egretProto__.startGame = function () {
    };
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
