/**
 * Created by Mr.Lan on 2015/8/27.
 */
module Entity {
    export class Obstacle extends egret.Sprite {
        public key:string = "obstacle";
        private objectPool:ObjectPool = ObjectPool.getInstance();
        private speed:number = 0.6;
        private stageH:number = egret.MainContext.instance.stage.stageHeight;

        constructor() {
            super();

            this.createShape();
        }

        public onCreate(x:number, y:number) {
            this.x = x;
            this.y = y;
        }

        private createShape() {
            this.width = 64;
            this.height = 64;
            this.anchorX = this.anchorY = 0.5;
            this.graphics.beginFill(0xff0000, 0.8);
            this.graphics.drawRect(0, 0, this.width, this.height);
            this.graphics.endFill();
        }

        public onEnterFrame(advancedTime:number) {
            this.y += this.speed * advancedTime;
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