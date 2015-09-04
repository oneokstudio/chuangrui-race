/**
 * Created by Mr.Lan on 2015/9/2.
 */
class ItemView extends egret.DisplayObjectContainer {
    private nameStr:string;
    private scoreStr:number;

    constructor(name?:string, score?:number) {
        super();

        this.nameStr = name || "XXXX";
        this.scoreStr = score || 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createItem, this);
    }

    private createItem() {
        var nameLabel:egret.TextField = new egret.TextField();
        nameLabel.text = this.nameStr;
        nameLabel.width = this.width - 30;
        nameLabel.height = 80;
        nameLabel.size = 38;
        nameLabel.x = 30;
        nameLabel.textAlign = "left";

        var scoreLabel:egret.TextField = new egret.TextField();
        scoreLabel.text = this.scoreStr.toString();
        scoreLabel.height = 80;
        scoreLabel.width = this.width - 30;
        scoreLabel.size = 38;
        scoreLabel.anchorX = 1;
        scoreLabel.x = this.width - 30;
        scoreLabel.textAlign = "right";

        this.addChild(nameLabel);
        this.addChild(scoreLabel);
    }
}