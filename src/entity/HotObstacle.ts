/**
 * Created by Mr.Lan on 2015/9/4.
 */
module Entity {
    export class HotObstacle extends Entity.Obstacle {
        public static key:string = "hot";

        constructor() {
            super();
        }

        public createShape() {
            this.bgBitmap.texture = RES.getRes("ImageSheet.hot");
            this.addChild(this.bgBitmap);
            this.anchorX = this.anchorY = 0.5;
            //障碍物大小调整为60%
            this.scaleX = this.scaleY = 0.6;
        }

        public onOverlapping():string {
            this.parent.removeChild(this);
            this.objectPool.destroyObject(this);
            this.game.score -= 100;
            return "hot";
        }
    }
}