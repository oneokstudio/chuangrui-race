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
        private _poolList:Array<egret.TextField>;

        private crashSound:egret.Sound;
        private heatSound:egret.Sound;
        private hitSound:egret.Sound;
        private overloadSound:egret.Sound;

        constructor(left?:number, right?:number) {
            super();

            this.speed = 0.3;
            this.leftBound = left || 142;
            this.rightBound = right || egret.MainContext.instance.stage.stageWidth - 142;
            this.UIScene = UIScene.getInstance();
            this.crashSound = RES.getRes("crash-m");
            this.heatSound = RES.getRes("heat-m");
            this.hitSound = RES.getRes("hit-m");
            this.overloadSound = RES.getRes("overload-m");

            this.carBitmap = new egret.Bitmap();
            this._poolList = [];
            this.createCar();
        }

        private createCar() {
            this.carBitmap.texture = RES.getRes("ImageSheet.car");
            //this.carBitmap.y = -100;
            this.addChild(this.carBitmap);

            this.anchorX = this.anchorY = 0.5;
            //大小调整为80%
            this.scaleX = this.scaleY = 0.8;
        }

        public createTextField(type:number):egret.TextField {
            var textField = this._poolList.shift();
            if(textField == null)
                textField = new egret.TextField();
            return this.initTextField(textField, type);
        }

        public destroyTextField(textField:egret.TextField) {
            egret.MainContext.instance.stage.removeChild(textField);
            this._poolList.push(textField);
        }

        private initTextField(textField:egret.TextField, type:number):egret.TextField {
            textField.text = type > 0 ? "200" : "-100";
            textField.textColor = type > 0 ? 0xef8500 : 0xff0000;
            textField.textAlign = "center";
            textField.anchorX = textField.anchorY = 0.5;
            textField.size = 60;
            textField.x = this.x;
            textField.y = this.y;
            return textField;
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
            this.flow(1);
        }
        /**
         * 执行屏幕抖动效果
         */
        private shake() {
            if (GlobalData.music) {
                this.crashSound.play();
            }
            egret.Tween.get(this.parent.parent).to({x : -10}, 50).to({x : 10}, 100).to({x : 0}, 50);
            this.flow(0);
        }

        /**
         * 执行闪烁效果
         */
        private blink() {
            if (GlobalData.music) {
                this.heatSound.play();
            }
            egret.Tween.get(this).to({alpha : 0.5}, 100).to({alpha : 1}, 100).to({alpha : 0.5}, 100).to({alpha : 1}, 100);
            this.flow(0);
        }

        /**
         * 执行旋转效果
         */
        private rotate() {
            if (GlobalData.music) {
                this.overloadSound.play();
            }
            egret.Tween.get(this).to({rotation : 360}, 1000);
            this.flow(0);
        }

        /**
         * 执行飘字效果
         */
        private flow(type:number) {
            var textField = this.createTextField(type);
            egret.MainContext.instance.stage.addChild(textField);
            egret.Tween.get(textField).to({x : this.x + 100, y : this.y - 80}, 500).call(this.destroyTextField, this, [textField]);
        }
    }
}