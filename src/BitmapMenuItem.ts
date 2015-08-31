/**
 * Created by Mr.Lan on 2015/8/25.
 */
class BitmapMenuItem extends egret.Sprite {
    private menuItemBitmap:egret.Bitmap;
    private normalTexture:egret.Texture;
    private callBack;
    private target;
    private menuId:string;
    /**
     * 构造函数
     * @param name MenuItem的ID
     * @param normal 正常状态下MenuItem背景
     * @param callBack 点击回调函数
     * @param target 回调对象
     */
    constructor(name, normal, callBack, target) {
        super();
        this.menuItemBitmap = new egret.Bitmap();
        this.normalTexture = RES.getRes(normal);
        this.callBack = callBack;
        this.target = target;
        this.menuId = name;
        this.anchorX = this.anchorY = 0.5;

        this.addChild(this.menuItemBitmap);
        this.touchEnabled = true;

        this.menuItemBitmap.texture = this.normalTexture;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapBegin, this, false);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTapCancel, this, false);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTapEnd, this, false);
    }

    private onTapBegin(event:egret.TouchEvent) {
        this.menuItemBitmap.scaleX = this.menuItemBitmap.scaleY = 0.9;
    }

    private onTapCancel(event:egret.TouchEvent) {
        this.menuItemBitmap.scaleX = this.menuItemBitmap.scaleY = 1;
    }

    private onTapEnd(event:egret.TouchEvent) {
        this.menuItemBitmap.scaleX = this.menuItemBitmap.scaleY = 1;
        if(this.callBack && this.target)
            this.callBack.call(this.target, this.menuId);
    }
}