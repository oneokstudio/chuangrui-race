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
        this.leftButton = new egret.Bitmap();
        this.rightButton = new egret.Bitmap();
        this.wingPanel = new egret.Bitmap();
        this.createUI();
    }
    var __egretProto__ = UIScene.prototype;
    __egretProto__.createUI = function () {
        var stageW = egret.MainContext.instance.stage.stageWidth;
        var stageH = egret.MainContext.instance.stage.stageHeight;
        //score label
        //this.textField.text = "0M";
        //this.textField.textColor = 0xffff00;
        //this.textField.size = 64;
        //this.textField.x = this.textField.y = 10;
        //this.addChild(this.textField);
        //�ײ�������
        this.wingPanel.texture = RES.getRes("ImageSheet.wing");
        this.wingPanel.anchorX = this.wingPanel.anchorY = 0.5;
        this.wingPanel.x = stageW / 2;
        this.wingPanel.y = stageH - 65;
        this.addChild(this.wingPanel);
        //����ť
        this.leftButton.touchEnabled = true;
        this.leftButton.texture = RES.getRes("ImageSheet.leftButton");
        this.leftButton.x = 67;
        this.leftButton.y = stageH - 50;
        this.leftButton.anchorX = this.leftButton.anchorY = 0.5;
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLeftTouchBegin, this);
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onLeftTouchEnd, this);
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onLeftTouchEnd, this);
        this.addChild(this.leftButton);
        //�Ұ�ť
        this.rightButton.touchEnabled = true;
        this.rightButton.texture = RES.getRes("ImageSheet.rightButton");
        this.rightButton.x = stageW - 67;
        this.rightButton.y = stageH - 50;
        this.rightButton.anchorX = this.rightButton.anchorY = 0.5;
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
        this.leftButton.scaleX = this.leftButton.scaleY = 0.9;
    };
    __egretProto__.onLeftTouchEnd = function (event) {
        this.left = false;
        this.leftButton.scaleX = this.leftButton.scaleY = 1;
    };
    __egretProto__.onRightTouchBegin = function (event) {
        this.right = true;
        this.rightButton.scaleX = this.rightButton.scaleY = 0.9;
    };
    __egretProto__.onRightTouchEnd = function (event) {
        this.right = false;
        this.rightButton.scaleX = this.rightButton.scaleY = 1;
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
