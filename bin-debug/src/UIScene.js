/**
 * Created by Mr.Lan on 2015/8/28.
 */
var UIScene = (function (_super) {
    __extends(UIScene, _super);
    function UIScene() {
        _super.call(this);
        this.game = Entity.Game.getInstance();
        this.left = false;
        this.right = false;
        this.textField = new egret.TextField();
        this.leftButton = new egret.Sprite();
        this.rightButton = new egret.Sprite();
        this.createUI();
    }
    var __egretProto__ = UIScene.prototype;
    __egretProto__.createUI = function () {
        var stageW = egret.MainContext.instance.stage.stageWidth;
        var stageH = egret.MainContext.instance.stage.stageHeight;
        //score label
        this.textField.text = "0M";
        this.textField.textColor = 0xffff00;
        this.textField.size = 64;
        this.textField.x = this.textField.y = 10;
        this.addChild(this.textField);
        //left button
        this.leftButton.touchEnabled = true;
        this.leftButton.graphics.beginFill(0x00ff00);
        this.leftButton.graphics.drawRect(0, 0, 128, 64);
        this.leftButton.graphics.endFill();
        this.leftButton.x = 20;
        this.leftButton.y = stageH - 70;
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLeftTouchBegin, this);
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onLeftTouchEnd, this);
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onLeftTouchEnd, this);
        this.addChild(this.leftButton);
        //right button
        this.rightButton.touchEnabled = true;
        this.rightButton.graphics.beginFill(0x0000ff);
        this.rightButton.graphics.drawRect(0, 0, 128, 64);
        this.rightButton.graphics.endFill();
        this.rightButton.x = stageW - 148;
        this.rightButton.y = stageH - 70;
        this.rightButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRightTouchBegin, this);
        this.rightButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRightTouchEnd, this);
        this.rightButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onRightTouchEnd, this);
        this.addChild(this.rightButton);
    };
    __egretProto__.updateScore = function (score) {
        this.textField.text = score + "M";
    };
    __egretProto__.onLeftTouchBegin = function (event) {
        this.left = true;
    };
    __egretProto__.onLeftTouchEnd = function (event) {
        this.left = false;
    };
    __egretProto__.onRightTouchBegin = function (event) {
        this.right = true;
    };
    __egretProto__.onRightTouchEnd = function (event) {
        this.right = false;
    };
    UIScene.getInstance = function () {
        if (this._instance == null) {
            this._instance = new UIScene();
        }
        return this._instance;
    };
    return UIScene;
})(egret.DisplayObjectContainer);
UIScene.prototype.__class__ = "UIScene";
