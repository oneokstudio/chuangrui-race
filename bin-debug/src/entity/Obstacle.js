/**
 * Created by Mr.Lan on 2015/8/27.
 */
var Entity;
(function (Entity) {
    var Obstacle = (function (_super) {
        __extends(Obstacle, _super);
        function Obstacle() {
            _super.call(this);
            this.key = "obstacle";
            this.objectPool = ObjectPool.getInstance();
            this.speed = 0.6;
            this.stageH = egret.MainContext.instance.stage.stageHeight;
            this.createShape();
        }
        var __egretProto__ = Obstacle.prototype;
        __egretProto__.onCreate = function (x, y) {
            this.x = x;
            this.y = y;
        };
        __egretProto__.createShape = function () {
            this.width = 64;
            this.height = 64;
            this.anchorX = this.anchorY = 0.5;
            this.graphics.beginFill(0xff0000, 0.8);
            this.graphics.drawRect(0, 0, this.width, this.height);
            this.graphics.endFill();
        };
        __egretProto__.onEnterFrame = function (advancedTime) {
            this.y += this.speed * advancedTime;
            if (this.y > this.stageH - 100) {
                this.parent.removeChild(this);
                this.objectPool.destroyObject(this);
            }
        };
        __egretProto__.onDestroy = function () {
            this.x = 0;
            this.y = 0;
        };
        return Obstacle;
    })(egret.Sprite);
    Entity.Obstacle = Obstacle;
    Obstacle.prototype.__class__ = "Entity.Obstacle";
})(Entity || (Entity = {}));
