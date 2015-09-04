/**
 * Created by Mr.Lan on 2015/8/28.
 */
var Entity;
(function (Entity) {
    var Game = (function () {
        function Game() {
            this.timer = new egret.Timer(1000, 0);
            this.obstacleManager = Controller.ObstacleManager.getInstance();
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onSpeedUp, this);
        }
        var __egretProto__ = Game.prototype;
        Game.getInstance = function () {
            if (this._instance == null) {
                this._instance = new Game();
            }
            return this._instance;
        };
        __egretProto__.gameStart = function () {
            this.score = 0;
            this.state = true;
            this.obstacleSpeed = 0.6;
            this.obstacleManager.produce();
            this.timer.start();
        };
        __egretProto__.gameOver = function () {
            this.state = false;
            this.timer.stop();
        };
        __egretProto__.onSpeedUp = function () {
            this.obstacleManager.produce();
            this.obstacleSpeed += 0.01;
        };
        return Game;
    })();
    Entity.Game = Game;
    Game.prototype.__class__ = "Entity.Game";
})(Entity || (Entity = {}));
