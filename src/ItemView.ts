/**
 * Created by Mr.Lan on 2015/9/2.
 */
class ItemView extends egret.DisplayObjectContainer {
    private nameStr:string;
    private scoreStr:number;
    private url:string;
    private urlloader:egret.URLLoader;
    private bitmap:egret.Bitmap;
    private rank:number;

    constructor(rank?:number, url?:string, name?:string, score?:number) {
        super();

        this.url = url;
        this.rank = rank;
        this.nameStr = name || "XXXX";
        this.scoreStr = score || 0;
        this.bitmap = new egret.Bitmap();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createItem, this);
    }

    private createItem() {
        this.urlloader = new egret.URLLoader();
        this.urlloader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var urlreq:egret.URLRequest = new egret.URLRequest();
        urlreq.url = this.url;
        this.urlloader.load(urlreq);
        this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);

        this.bitmap.x = 80;
        this.bitmap.y = 0;
        this.bitmap.width = this.bitmap.height = 36;

        var rankLabel:egret.TextField = new egret.TextField();
        rankLabel.text = this.rank + ".";
        rankLabel.height = 20;
        rankLabel.size = 30;
        rankLabel.x = 30;
        rankLabel.y = 3;
        rankLabel.textAlign = "left";

        var nameLabel:egret.TextField = new egret.TextField();
        nameLabel.text = this.nameStr;
        nameLabel.width = this.width - 30;
        nameLabel.height = 20;
        nameLabel.size = 20;
        nameLabel.x = 130;
        nameLabel.y = 8;
        nameLabel.textAlign = "left";

        var scoreLabel:egret.TextField = new egret.TextField();
        scoreLabel.text = this.scoreStr.toString();
        scoreLabel.height = 20;
        scoreLabel.width = this.width - 30;
        scoreLabel.size = 20;
        scoreLabel.anchorX = 1;
        scoreLabel.x = this.width - 80;
        scoreLabel.y = 8;
        scoreLabel.textAlign = "right";

        this.addChild(rankLabel);
        this.addChild(nameLabel);
        this.addChild(scoreLabel);
        this.addChild(this.bitmap);
    }

    private onComplete(event:egret.Event):void {
        this.bitmap.texture = this.urlloader.data;
    }
}