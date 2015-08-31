/**
 * Created by Mr.Lan on 2015/8/28.
 */
var Entity;
(function (Entity) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(left, right) {
            _super.call(this);
            this.speed = 0.3;
            this.leftBound = left || 104;
            this.rightBound = right || egret.MainContext.instance.stage.stageWidth - 104;
            this.UIScene = UIScene.getInstance();
            this.carBitmap = new egret.Bitmap();
            this.createCar();
        }
        var __egretProto__ = Player.prototype;
        __egretProto__.createCar = function () {
            this.carBitmap.texture = RES.getRes("ImageSheet.car");
            this.addChild(this.carBitmap);
            this.anchorX = this.anchorY = 0.5;
        };
        __egretProto__.updatePosition = function (advancedTime) {
            if (this.UIScene.left && this.UIScene.right)
                return;
            if (this.UIScene.left && this.x > this.leftBound) {
                this.x -= this.speed * advancedTime;
            }
            else if (this.UIScene.right && this.x < this.rightBound) {
                this.x += this.speed * advancedTime;
            }
        };
        return Player;
    })(egret.Sprite);
    Entity.Player = Player;
    Player.prototype.__class__ = "Entity.Player";
})(Entity || (Entity = {}));
