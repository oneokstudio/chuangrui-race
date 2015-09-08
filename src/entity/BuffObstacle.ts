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
            this.bgBitmap.texture = RES.getRes("ImageSheet.buff");
            this.addChild(this.bgBitmap);
            this.anchorX = this.anchorY = 0.5;
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