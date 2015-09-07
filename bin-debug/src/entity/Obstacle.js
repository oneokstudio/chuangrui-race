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
            this.stageH = egret.MainContext.instance.stage.stageHeight;
            this.game = Entity.Game.getInstance();
            this.bgBitmap = new egret.Bitmap();
            this.createShape();
        }
        var __egretProto__ = Obstacle.prototype;
        __egretProto__.onCreate = function (x, y) {
            this.x = x;
            this.y = y;
        };
        __egretProto__.createShape = function () {
        };
        __egretProto__.onDestroy = function () {
            this.x = 0;
            this.y = 0;
        };
        __egretProto__.onEnterFrame = function (advancedTime) {
            this.y += this.game.obstacleSpeed * advancedTime;
            if (this.y > this.stageH - 100) {
                this.parent.removeChild(this);
                this.objectPool.destroyObject(this);
            }
        };
        __egretProto__.onOverlapping = function () {
            return true;
        };
        return Obstacle;
    })(egret.Sprite);
    Entity.Obstacle = Obstacle;
    Obstacle.prototype.__class__ = "Entity.Obstacle";
})(Entity || (Entity = {}));
