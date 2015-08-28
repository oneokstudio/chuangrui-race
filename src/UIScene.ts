/**
 * Created by Mr.Lan on 2015/8/28.
 */
class UIScene extends egret.DisplayObjectContainer {
    private static _instance:UIScene;
    public left:boolean;
    public right:boolean;
    private game:Entity.Game;
    private textField:egret.TextField;
    private leftButton:egret.Sprite;
    private rightButton:egret.Sprite;

    constructor() {
        super();
        this.game = Entity.Game.getInstance();
        this.left = false;
        this.right = false;
        this.textField = new egret.TextField();
        this.leftButton = new egret.Sprite();
        this.rightButton = new egret.Sprite();
        this.createUI();
    }

    private createUI() {
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
    }

    public updateScore(score:number) {
        this.textField.text = score + "M";
    }

    private onLeftTouchBegin(event:egret.TouchEvent) {
        this.left = true;
    }

    private onLeftTouchEnd(event:egret.TouchEvent) {
        this.left = false;
    }

    private onRightTouchBegin(event:egret.TouchEvent) {
        this.right = true;
    }

    private onRightTouchEnd(event:egret.TouchEvent) {
        this.right = false;
    }

    public static getInstance():UIScene {
        if(this._instance == null) {
            this._instance = new UIScene();
        }
        return this._instance;
    }
}