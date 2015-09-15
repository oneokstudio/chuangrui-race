/**
 * Created by Mr.Lan on 2015/9/2.
 */
class RankScene extends egret.Sprite {
    private bgBitmap:egret.Bitmap;
    private scrollView:egret.ScrollView;
    private itemContainer:egret.DisplayObjectContainer;

    constructor() {
        super();

        this.scrollView = new egret.ScrollView();
        this.itemContainer = new egret.DisplayObjectContainer();
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createScene, this);
    }

    public createScene(rankList) {
        for(var i = 0; i < rankList.length; i++) {
            var imgStr = rankList[i].headimgurl;
            imgStr = imgStr.substr(0, imgStr.length-1) + '46';
            var temp = new ItemView(i+1, imgStr, rankList[i].nickname, rankList[i].score);
            this.itemContainer.addChild(temp);
            temp.width = this.width;
            temp.x = 0;
            temp.y = i * 45;
        }

        this.scrollView.width = this.width;
        this.scrollView.height = this.height;
        this.scrollView.setContent(this.itemContainer);
        this.addChild(this.scrollView);
    }
}