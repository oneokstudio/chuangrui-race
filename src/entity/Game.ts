/**
 * Created by Mr.Lan on 2015/8/28.
 */
module Entity {
    export class Game {
        //对象单例
        private static _instance:Game;
        private _score:number;
        private bgSound:egret.Sound;
        private gamingBgSound:egret.Sound;
        public time:number;
        public state:boolean;
        public obstacleSpeed:number;
        public timer:egret.Timer = new egret.Timer(1000, 0);
        public obstacleManager:Controller.ObstacleManager;

        constructor() {
            this.bgSound = RES.getRes("bg-m");
            this.gamingBgSound = RES.getRes("gaming-m");
            this.obstacleManager = Controller.ObstacleManager.getInstance();
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onSpeedUp, this);
        }

        public static getInstance():Game {
            if(this._instance == null) {
                this._instance = new Game();
            }
            return this._instance;
        }

        public gameStart() {
            if (GlobalData.music) {
                this.gamingBgSound.play(true);
            }
            this.score = 0;
            this.state = true;
            this.time = 120;
            this.obstacleSpeed = 0.65;
            this.timer.start();
        }

        public gameOver() {
            if (GlobalData.music) {
                this.gamingBgSound.pause();
                this.bgSound.play(true);
            }
            this.state = false;
            this.timer.stop();
            this.obstacleManager.clearPool();
        }

        private onSpeedUp() {
            this.time--;
            egret.callLater(function() {
                var randomNumber = Math.round(Math.random() * 10);
                if(randomNumber > 5) {
                    this.obstacleManager.produce(0);
                    //this.obstacleSpeed += 0.01;
                }else {
                    this.obstacleManager.produce(1);
                }
            }, this);
        }

        get score() {
            return this._score;
        }

        set score(newNumber:number) {
            if(newNumber < 0)
                this._score = 0;
            else
                this._score = newNumber;
        }
    }
}