/**
 * Created by Mr.Lan on 2015/8/28.
 */
var Entity;
(function (Entity) {
    var Game = (function () {
        function Game() {
            this.score = 0;
            this.state = false;
        }
        var __egretProto__ = Game.prototype;
        Game.getInstance = function () {
            if (this._instance == null) {
                this._instance = new Game();
            }
            return this._instance;
        };
        return Game;
    })();
    Entity.Game = Game;
    Game.prototype.__class__ = "Entity.Game";
})(Entity || (Entity = {}));
