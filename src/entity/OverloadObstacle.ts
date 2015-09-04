/**
 * Created by Mr.Lan on 2015/9/4.
 */
module Entity {
    export class OverloadObstacle extends Entity.Obstacle {
        public key:string = "overload";

        constructor() {
            super();
        }

        public createShape() {
            this.bgBitmap.texture = RES.getRes("ImageSheet.overload");
            this.addChild(this.bgBitmap);
            this.anchorX = this.anchorY = 0.5;
        }
    }
}