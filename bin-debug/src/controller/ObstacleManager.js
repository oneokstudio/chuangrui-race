/**
 * Created by Mr.Lan on 2015/8/28.
 */
var Controller;
(function (Controller) {
    var ObstacleManager = (function () {
        function ObstacleManager() {
            this.objectPool = ObjectPool.getInstance();
            this.obstacleBounds = new egret.Rectangle();
            this.playerBounds = new egret.Rectangle();
            this.obstacleClass = {
                "0": Entity.HotObstacle,
                "1": Entity.OverloadObstacle,
                "2": Entity.ShakeObstacle
            };
        }
        var __egretProto__ = ObstacleManager.prototype;
        __egretProto__.checkOverlapping = function (obstacle, player) {
            //障碍物在玩家身后不判断碰撞
            if (obstacle.y > player.y)
                return false;
            obstacle.getBounds(this.obstacleBounds, true);
            player.getBounds(this.playerBounds, true);
            this.obstacleBounds.x += obstacle.x;
            this.obstacleBounds.y += obstacle.y;
            //障碍物大小调整为80%
            this.obstacleBounds.width *= 0.8;
            this.obstacleBounds.height *= 0.8;
            this.playerBounds.x += player.x;
            this.playerBounds.y += player.y;
            return this.obstacleBounds.intersects(this.playerBounds);
        };
        __egretProto__.setScene = function (playScene) {
            this.playScene = playScene;
        };
        __egretProto__.produce = function (type) {
            if (type === 0)
                this.playScene.addChild(this.objectPool.createObject(this.obstacleClass[Math.round(Math.random() * 2)], Math.random() * 392 + 156, -80));
            else
                this.playScene.addChild(this.objectPool.createObject(Entity.BuffObstacle, Math.random() * 392 + 156, -80));
        };
        __egretProto__.updatePool = function (advancedTime) {
            this.objectPool.updatePool(advancedTime);
        };
        __egretProto__.isOverlapping = function (player) {
            for (var i = 0, length = this.objectPool._list.length; i < length; i++) {
                if (this.checkOverlapping(this.objectPool._list[i], player)) {
                    return this.objectPool._list[i].onOverlapping();
                }
            }
            return "null";
        };
        ObstacleManager.getInstance = function () {
            if (ObstacleManager.instance == null) {
                ObstacleManager.instance = new ObstacleManager();
            }
            return ObstacleManager.instance;
        };
        return ObstacleManager;
    })();
    Controller.ObstacleManager = ObstacleManager;
    ObstacleManager.prototype.__class__ = "Controller.ObstacleManager";
})(Controller || (Controller = {}));
