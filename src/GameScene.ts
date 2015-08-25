/**
 * Created by Mr.Lan on 2015/8/25.
 */
class GameScene extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initScene, this);
    }

    private initScene() {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var bgShape:egret.Shape = new egret.Shape();
        bgShape.graphics.beginFill(0xe8e8e8, 0.6);
        bgShape.graphics.drawRect(0, 0, stageW, stageH);
        bgShape.graphics.endFill();

        this.addChild(bgShape);
        this.startGame();
    }

    private startGame() {

    }
}