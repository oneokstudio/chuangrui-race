/**
 * Created by Mr.Lan on 2015/8/25.
 */
var BitmapMenuItem = (function (_super) {
    __extends(BitmapMenuItem, _super);
    /**
     * 构造函数
     * @param name MenuItem的ID
     * @param normal 正常状态下MenuItem背景
     * @param active 活动状态下MenuItem背景
     * @param callBack 点击回调函数
     * @param target 回调对象
     */
    function BitmapMenuItem(name, normal, active, callBack, target) {
        _super.call(this);
        this.menuItemBitmap = new egret.Bitmap();
        this.normalTexture = RES.getRes(normal);
        this.activeTexture = RES.getRes(active);
        this.callBack = callBack;
        this.target = target;
        this.menuId = name;
        this.addChild(this.menuItemBitmap);
        this.touchEnabled = true;
        this.menuItemBitmap.texture = this.normalTexture;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapBegin, this, false);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTapEnd, this, false);
    }
    var __egretProto__ = BitmapMenuItem.prototype;
    __egretProto__.onTapBegin = function (event) {
        this.menuItemBitmap.texture = this.activeTexture;
    };
    __egretProto__.onTapEnd = function (event) {
        this.menuItemBitmap.texture = this.normalTexture;
        if (this.callBack && this.target)
            this.callBack.call(this.target, this.menuId);
    };
    return BitmapMenuItem;
})(egret.Sprite);
BitmapMenuItem.prototype.__class__ = "BitmapMenuItem";
