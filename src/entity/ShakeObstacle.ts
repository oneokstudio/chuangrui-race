/**
 * Created by Mr.Lan on 2015/9/4.
 */
module Entity {
    export class ShakeObstacle extends Entity.Obstacle {
        public static key:string = "shake";

        constructor() {
            super();
        }

        public createShape() {
            this.bgBitmap.texture = RES.getRes("ImageSheet.shake");
            this.addChild(this.bgBitmap);
            this.anchorX = this.anchorY = 0.5;
        }
    }
}