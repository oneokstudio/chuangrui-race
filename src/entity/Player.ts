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

        private crashSound:egret.Sound;
        private heatSound:egret.Sound;
        private hitSound:egret.Sound;

        constructor(left?:number, right?:number) {
            super();

            this.speed = 0.3;
            this.leftBound = left || 142;
            this.rightBound = right || egret.MainContext.instance.stage.stageWidth - 142;
            this.UIScene = UIScene.getInstance();
            this.crashSound = RES.getRes("crash-m");
            this.heatSound = RES.getRes("heat-m");
            this.hitSound = RES.getRes("hit-m");

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

        /**
         * 执行碰撞回馈
         * @param cmd 效果名
         */
        public op(cmd:string) {
            switch (cmd) {
                case "buff":
                    this.buff();
                    break;
                case "shake":
                    this.shake();
                    break;
                case "overload":
                    this.rotate();
                    break;
                case "hot":
                    this.blink();
                    break;
            }
        }
        /**
         * 遇上TE
         */
        private buff() {
            if (GlobalData.music) {
                this.hitSound.play();
            }
        }
        /**
         * 执行屏幕抖动效果
         */
        private shake() {
            if (GlobalData.music) {
                this.crashSound.play();
            }
            egret.Tween.get(this.parent.parent).to({x : -10}, 50).to({x : 10}, 100).to({x : 0}, 50);
        }

        /**
         * 执行闪烁效果
         */
        private blink() {
            if (GlobalData.music) {
                this.heatSound.play();
            }
            egret.Tween.get(this).to({alpha : 0.5}, 100).to({alpha : 1}, 100).to({alpha : 0.5}, 100).to({alpha : 1}, 100);
        }

        /**
         * 执行旋转效果
         */
        private rotate() {
            if (GlobalData.music) {
                this.crashSound.play();
            }
            egret.Tween.get(this).to({rotation : 360}, 1000);
        }
    }
}