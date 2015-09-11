/**
 * Created by Mr.Lan on 2015/9/9.
 */
class EndSceneLayer extends egret.DisplayObjectContainer {
    private static _instance:EndSceneLayer;

    constructor() {
        super();
        this.anchorX = this.anchorY = 0.5;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        //关闭按钮
        var closeButton = new egret.TextField();
        closeButton.anchorX = 1;
        closeButton.x = 380;
        closeButton.y = 10;
        closeButton.touchEnabled = true;
        closeButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
            this.parent.removeChild(this);
        }, this);
        closeButton.text = "X";
        closeButton.textColor = 0x000000;

        //文字
        var textField = new egret.TextField();
        textField.x = 20;
        textField.y = 50;
        textField.text = "电动方程式锦标赛北京站开赛前，您可以通过Fanboosts投票给最喜爱的车手，帮助他们在正式的比赛中获得额外加速的机会。请点击下面的头像，为TE赞助的Andretti车队的美女车手 Simona 加油吧！";
        textField.textColor = 0x000000;
        textField.lineSpacing = 10;
        textField.width = 360;

        var button = new BitmapMenuItem("fight", "ImageSheet.fbButton", function() {
            if (GlobalData.fanboostStart) {
                window.open("http://fanboost.fiaformulae.com/cn.aspx");
            }
        }, this);
        button.width =  button.height = 160;
        button.x = 200;
        button.y = textField.y + textField.measuredHeight + 100;

        var shape = new egret.Shape();
        shape.graphics.beginFill(0xBFCFFE, 0.8);
        shape.graphics.drawRoundRect(0, 0, 400, textField.measuredHeight + 240, 60, 60);
        shape.graphics.endFill();
        this.addChild(shape);
        this.addChild(closeButton);
        this.addChild(textField);
        this.addChild(button);
    }

    public static getInstance():EndSceneLayer {
        if(EndSceneLayer._instance == null) {
            EndSceneLayer._instance = new EndSceneLayer();
        }
        return EndSceneLayer._instance;
    }
}