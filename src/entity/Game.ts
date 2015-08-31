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
            this.obstacleSpeed = 0.6;
            this.obstacleManager.produce();
            this.timer.start();
        }

        public gameOver() {
            this.state = false;
            this.timer.stop();
        }

        private onSpeedUp() {
            this.obstacleManager.produce();
            this.obstacleSpeed += 0.01;
        }
    }
}