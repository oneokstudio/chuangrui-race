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
        this.timeField = new egret.TextField();
        this.leftButton = new egret.Bitmap();
        this.rightButton = new egret.Bitmap();
        this.wingPanel = new egret.Bitmap();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createUI, this);
    }
    var __egretProto__ = UIScene.prototype;
    __egretProto__.createUI = function () {
        var stageW = egret.MainContext.instance.stage.stageWidth;
        var stageH = egret.MainContext.instance.stage.stageHeight;
        //时间面板
        this.timeField.text = "时间:";
        this.timeField.textColor = 0xef8500;
        this.timeField.size = 40;
        this.timeField.x = this.timeField.y = 10;
        this.addChild(this.timeField);
        //分数面板
        this.textField.text = "0";
        this.textField.textColor = 0xef8500;
        this.textField.size = 40;
        this.textField.anchorX = 1;
        this.textField.x = stageW - 10;
        this.textField.y = 10;
        this.addChild(this.textField);
        //底部翅膀栏
        this.wingPanel.texture = RES.getRes("wing");
        this.wingPanel.anchorX = this.wingPanel.anchorY = 0.5;
        this.wingPanel.x = stageW / 2;
        this.wingPanel.y = stageH - 50;
        this.addChild(this.wingPanel);
        //左按钮
        this.leftButton.touchEnabled = true;
        this.leftButton.texture = RES.getRes("ImageSheet.leftButton");
        this.leftButton.x = 70;
        this.leftButton.y = stageH - 60;
        this.leftButton.scaleX = this.leftButton.scaleY = 1.8;
        this.leftButton.anchorX = this.leftButton.anchorY = 0.5;
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLeftTouchBegin, this);
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onLeftTouchEnd, this);
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onLeftTouchEnd, this);
        this.addChild(this.leftButton);
        //右按钮
        this.rightButton.touchEnabled = true;
        this.rightButton.texture = RES.getRes("ImageSheet.rightButton");
        this.rightButton.x = stageW - 70;
        this.rightButton.y = stageH - 60;
        this.rightButton.scaleX = this.rightButton.scaleY = 1.8;
        this.rightButton.anchorX = this.rightButton.anchorY = 0.5;
        this.rightButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRightTouchBegin, this);
        this.rightButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRightTouchEnd, this);
        this.rightButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onRightTouchEnd, this);
        this.addChild(this.rightButton);
    };
    __egretProto__.updateUIText = function (score, time) {
        this.textField.text = score + "";
        this.timeField.text = "时间:" + time;
    };
    __egretProto__.onLeftTouchBegin = function (event) {
        this.left = true;
        this.leftButton.scaleX = this.leftButton.scaleY = 1.6;
    };
    __egretProto__.onLeftTouchEnd = function (event) {
        this.left = false;
        this.leftButton.scaleX = this.leftButton.scaleY = 1.8;
    };
    __egretProto__.onRightTouchBegin = function (event) {
        this.right = true;
        this.rightButton.scaleX = this.rightButton.scaleY = 1.6;
    };
    __egretProto__.onRightTouchEnd = function (event) {
        this.right = false;
        this.rightButton.scaleX = this.rightButton.scaleY = 1.8;
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
