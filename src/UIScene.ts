/**
 * Created by Mr.Lan on 2015/8/28.
 */
class UIScene extends egret.DisplayObjectContainer {
    private static _instance:UIScene;
    public left:boolean;
    public right:boolean;
    private game:Entity.Game;
    private textField:egret.TextField;
    private leftButton:egret.Bitmap;
    private rightButton:egret.Bitmap;
    private wingPanel:egret.Bitmap;

    constructor() {
        super();
        this.game = Entity.Game.getInstance();
        this.left = false;
        this.right = false;
        this.textField = new egret.TextField();
        this.leftButton = new egret.Bitmap();
        this.rightButton = new egret.Bitmap();
        this.wingPanel = new egret.Bitmap();
        this.createUI();
    }

    private createUI() {
        var stageW = egret.MainContext.instance.stage.stageWidth;
        var stageH = egret.MainContext.instance.stage.stageHeight;
        //score label
        //this.textField.text = "0M";
        //this.textField.textColor = 0xffff00;
        //this.textField.size = 64;
        //this.textField.x = this.textField.y = 10;
        //this.addChild(this.textField);

        //底部翅膀栏
        this.wingPanel.texture = RES.getRes("wing");
        this.wingPanel.anchorX = this.wingPanel.anchorY = 0.5;
        this.wingPanel.x = stageW / 2;
        this.wingPanel.y = stageH - 50;
        this.addChild(this.wingPanel);

        //左按钮
        this.leftButton.touchEnabled = true;
        this.leftButton.texture = RES.getRes("ImageSheet.leftButton");
        this.leftButton.x = 67;
        this.leftButton.y = stageH - 35;
        this.leftButton.anchorX = this.leftButton.anchorY = 0.5;
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLeftTouchBegin, this);
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onLeftTouchEnd, this);
        this.leftButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onLeftTouchEnd, this);
        this.addChild(this.leftButton);

        //右按钮
        this.rightButton.touchEnabled = true;
        this.rightButton.texture = RES.getRes("ImageSheet.rightButton");
        this.rightButton.x = stageW - 67;
        this.rightButton.y = stageH - 35;
        this.rightButton.anchorX = this.rightButton.anchorY = 0.5;
        this.rightButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRightTouchBegin, this);
        this.rightButton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRightTouchEnd, this);
        this.rightButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onRightTouchEnd, this);
        this.addChild(this.rightButton);
    }

    public updateScore(score:number) {
        this.textField.text = score + "M";
    }

    private onLeftTouchBegin(event:egret.TouchEvent) {
        this.left = true;
        this.leftButton.scaleX = this.leftButton.scaleY = 0.9;
    }

    private onLeftTouchEnd(event:egret.TouchEvent) {
        this.left = false;
        this.leftButton.scaleX = this.leftButton.scaleY = 1;
    }

    private onRightTouchBegin(event:egret.TouchEvent) {
        this.right = true;
        this.rightButton.scaleX = this.rightButton.scaleY = 0.9;
    }

    private onRightTouchEnd(event:egret.TouchEvent) {
        this.right = false;
        this.rightButton.scaleX = this.rightButton.scaleY = 1;
    }

    public static getInstance():UIScene {
        if(this._instance == null) {
            this._instance = new UIScene();
        }
        return this._instance;
    }
}