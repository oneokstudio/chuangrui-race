/**
 * Created by Mr.Lan on 2015/8/28.
 */
module Entity {
    export class Player extends egret.Sprite {
        private speed:number;
        private leftBound:number;
        private rightBound:number;
        private carBitmap:egret.Bitmap;
        private UIScene:UIScene;

        constructor(left?:number, right?:number) {
            super();

            this.speed = 0.3;
            this.leftBound = left || 142;
            this.rightBound = right || egret.MainContext.instance.stage.stageWidth - 142;
            this.UIScene = UIScene.getInstance();
            this.carBitmap = new egret.Bitmap();
            this.createCar();
        }

        private createCar() {
            this.carBitmap.texture = RES.getRes("ImageSheet.car");
            this.addChild(this.carBitmap);

            this.anchorX = this.anchorY = 0.5;
        }

        public updatePosition(advancedTime:number) {
            if (this.UIScene.left && this.UIScene.right) {
                this.rotation = 0;
                return;
            }
            if (this.UIScene.left && this.x > this.leftBound) {
                this.x -= this.speed * advancedTime;
                this.rotation = -10;
            }else if (this.UIScene.right && this.x < this.rightBound) {
                this.x += this.speed * advancedTime;
                this.rotation = 10;
            }else {
                this.rotation = 0;
            }
        }
    }
}