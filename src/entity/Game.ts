/**
 * Created by Mr.Lan on 2015/8/28.
 */
module Entity {
    export class Game {
        //对象单例
        private static _instance:Game;
        public score:number;
        public state:boolean;
        public obstacleSpeed:number;
        public timer:egret.Timer = new egret.Timer(1000, 0);
        public obstacleManager:Controller.ObstacleManager;

        constructor() {
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
            this.score = 0;
            this.state = true;
            this.obstacleSpeed = 0.4;
            this.timer.start();
        }

        public gameOver() {
            this.state = false;
            this.timer.stop();
        }

        private onSpeedUp() {
            egret.callLater(function() {
                var randomNumber = Math.round(Math.random() * 10);
                if(randomNumber > 4) {
                    this.obstacleManager.produce(0);
                }else {
                    this.obstacleManager.produce(1);
                }
            }, this);
        }
    }
}