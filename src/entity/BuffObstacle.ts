/**
 * Created by Mr.Lan on 2015/9/6.
 */
module Entity {
    export class BuffObstacle extends Entity.Obstacle {
        public static key:string = "buff";

        constructor() {
            super();
        }

        public createShape() {
            this.bgBitmap.texture = RES.getRes("te");
            this.addChild(this.bgBitmap);
            this.anchorX = this.anchorY = 0.5;
            //障碍物大小调整为60%
            this.scaleX = this.scaleY = 0.6;
        }

        public onDestroy() {
            this.x = 0;
            this.y = 0;
        }

        public onOverlapping() {
            this.parent.removeChild(this);
            this.objectPool.destroyObject(this);
            this.game.score += 200;
            return "buff";
        }
    }
}