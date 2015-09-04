/**
 * Created by Mr.Lan on 2015/9/4.
 */
module Entity {
    export class HotObstacle extends Entity.Obstacle {
        public key:string = "hot";

        constructor() {
            super();
        }

        public createShape() {
            this.bgBitmap.texture = RES.getRes("ImageSheet.hot");
            this.addChild(this.bgBitmap);
            this.anchorX = this.anchorY = 0.5;
        }
    }
}