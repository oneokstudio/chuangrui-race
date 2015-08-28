/**
 * Created by Mr.Lan on 2015/8/28.
 */
module Entity {
    export class Player extends egret.Sprite {
        private speed:number;
        private leftBound:number;
        private rightBound:number;
        private UIScene:UIScene;

        constructor(left?:number, right?:number) {
            super();

            this.speed = 0.3;
            this.leftBound = left || 52;
            this.rightBound = right || egret.MainContext.instance.stage.stageWidth - 52;
            this.UIScene = UIScene.getInstance();
            this.createShape();
        }

        private createShape() {
            this.width = 64;
            this.height = 128;
            this.anchorX = this.anchorY = 0.5;
            this.graphics.beginFill(0x00f200, 0.8);
            this.graphics.drawRect(0, 0, this.width, this.height);
            this.graphics.endFill();
        }

        public updatePosition(advancedTime:number) {
            if (this.UIScene.left && this.UIScene.right)
                return;
            if (this.UIScene.left && this.x > this.leftBound)
                this.x -= this.speed * advancedTime;
            else if (this.UIScene.right && this.x < this.rightBound)
                this.x += this.speed * advancedTime;
        }
    }
}