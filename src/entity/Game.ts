/**
 * Created by Mr.Lan on 2015/8/28.
 */
module Entity {
    export class Game {
        //对象单例
        private static _instance:Game;
        public score:number;
        public state:boolean;

        constructor() {
            this.score = 0;
            this.state = false;
        }

        public static getInstance():Game {
            if(this._instance == null) {
                this._instance = new Game();
            }
            return this._instance;
        }
    }
}