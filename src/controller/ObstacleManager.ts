/**
 * Created by Mr.Lan on 2015/8/28.
 */
module Controller {
    export class ObstacleManager {
        private objectPool:ObjectPool = ObjectPool.getInstance();
        private static instance:ObstacleManager;
        private playScene:egret.DisplayObjectContainer;
        private obstacleBounds:egret.Rectangle = new egret.Rectangle();
        private playerBounds:egret.Rectangle = new egret.Rectangle();
        private obstacleClass = {
            "0" : Entity.HotObstacle,
            "1" : Entity.OverloadObstacle,
            "2" : Entity.ShakeObstacle
        };

        private checkOverlapping(obstacle:egret.Sprite, player:egret.Sprite) {
            obstacle.getBounds(this.obstacleBounds, true);
            player.getBounds(this.playerBounds, true);
            this.obstacleBounds.x += obstacle.x;
            this.obstacleBounds.y += obstacle.y;
            this.playerBounds.x += player.x;
            this.playerBounds.y += player.y;
            return this.obstacleBounds.intersects(this.playerBounds);
        }

        public setScene(playScene:egret.DisplayObjectContainer) {
            this.playScene = playScene;
        }

        public produce() {
            var index = Math.round(Math.random() * 2);
            console.log(index);
            this.playScene.addChild(this.objectPool.createObject(this.obstacleClass[index], Math.random() * 9 * 64 + 32, -32));
        }

        public updatePool(advancedTime: number) {
            this.objectPool.updatePool(advancedTime);
        }

        public isOverlapping(player:egret.Sprite):boolean {
            for(var i = 0, length = this.objectPool._list.length; i < length; i++) {
                if(this.checkOverlapping(this.objectPool._list[i], player))
                    return true;
            }
            return false;
        }

        public static getInstance():ObstacleManager {
            if(ObstacleManager.instance == null) {
                ObstacleManager.instance = new ObstacleManager();
            }
            return ObstacleManager.instance;
        }
    }
}