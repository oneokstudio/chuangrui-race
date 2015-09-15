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
            //障碍物在玩家身后不判断碰撞
            if(obstacle.y > player.y)
                return false;
            obstacle.getBounds(this.obstacleBounds, true);
            player.getBounds(this.playerBounds, true);
            this.obstacleBounds.x += obstacle.x;
            this.obstacleBounds.y += obstacle.y;

            //障碍物大小调整为60%
            this.obstacleBounds.width *= 0.6;
            this.obstacleBounds.height *= 0.6;

            //大小调整为80%
            this.playerBounds.width *= 0.8;
            this.playerBounds.height *= 0.8;

            this.playerBounds.x += player.x;
            this.playerBounds.y += player.y;
            return this.obstacleBounds.intersects(this.playerBounds);
        }

        public setScene(playScene:egret.DisplayObjectContainer) {
            this.playScene = playScene;
        }

        public produce(type:number) {
            if(type === 0)
                this.playScene.addChild(this.objectPool.createObject(this.obstacleClass[Math.round(Math.random() * 2)], Math.random() * 370 + 130, -40));
            else
                this.playScene.addChild(this.objectPool.createObject(Entity.BuffObstacle, Math.random() * 370 + 130, -40))
        }

        public updatePool(advancedTime: number) {
            this.objectPool.updatePool(advancedTime);
        }

        public isOverlapping(player:egret.Sprite):string {
            for(var i = 0, length = this.objectPool._list.length; i < length; i++) {
                if(this.checkOverlapping(this.objectPool._list[i], player)) {
                    return this.objectPool._list[i].onOverlapping();
                }
            }
            return "null";
        }

        public clearPool() {
            this.objectPool.clearPool();
        }

        public static getInstance():ObstacleManager {
            if(ObstacleManager.instance == null) {
                ObstacleManager.instance = new ObstacleManager();
            }
            return ObstacleManager.instance;
        }
    }
}