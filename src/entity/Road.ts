/**
 * Created by Mr.Lan on 2015/8/31.
 */
module Entity {
    export class Road extends egret.Sprite {
        private stageW:number;
        private stageH:number;
        private game:Game;
        private bgBitmap:egret.Bitmap;
        private anotherBitmap:egret.Bitmap;

        constructor() {
            super();

            this.game = Game.getInstance();
            this.bgBitmap = new egret.Bitmap();
            this.anotherBitmap = new egret.Bitmap();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this.stageW = egret.MainContext.instance.stage.stageWidth;
            this.stageH = egret.MainContext.instance.stage.stageHeight;

            this.bgBitmap.texture = this.anotherBitmap.texture = RES.getRes("road");
            this.bgBitmap.height = this.anotherBitmap.height = this.stageH;
            this.bgBitmap.anchorX = this.bgBitmap.anchorY = this.anotherBitmap.anchorX = this.anotherBitmap.anchorY = 0.5;
            this.bgBitmap.x = this.anotherBitmap.x = this.stageW / 2;
            this.bgBitmap.y = this.stageH / 2;
            this.anotherBitmap.y = this.bgBitmap.y + this.stageH;

            this.addChild(this.bgBitmap);
            this.addChild(this.anotherBitmap);
        }

        public updateBgPosition(advancedTime:number) {
            this.game.obstacleSpeed = 0.65  + this.game.score * 0.00006;
            this.y += this.game.obstacleSpeed * advancedTime;
            if(this.y > 0) {
                this.y = -this.stageH;
            }
        }
    }
}