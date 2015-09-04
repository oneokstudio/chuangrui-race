/**
 * Created by Mr.Lan on 2015/8/27.
 */
module Entity {
    export class Obstacle extends egret.Sprite {
        public key:string = "obstacle";
        public bgBitmap:egret.Bitmap;
        private objectPool:ObjectPool = ObjectPool.getInstance();
        private stageH:number = egret.MainContext.instance.stage.stageHeight;
        private game:Game = Game.getInstance();

        constructor() {
            super();

            this.bgBitmap = new egret.Bitmap();
            this.createShape();
        }

        public onCreate(x:number, y:number) {
            this.x = x;
            this.y = y;
        }

        public createShape() {

        }

        public onEnterFrame(advancedTime:number) {
            this.y += this.game.obstacleSpeed * advancedTime;
            if(this.y > this.stageH - 100) {
                this.parent.removeChild(this);
                this.objectPool.destroyObject(this);
            }
        }

        public onDestroy() {
            this.x = 0;
            this.y = 0;
        }
    }
}