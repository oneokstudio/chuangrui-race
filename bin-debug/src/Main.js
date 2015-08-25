/**
 * Created by Mr.Lan on 2015/8/25.
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.rootStage = egret.MainContext.instance.stage;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onRemoveFromStage = function (event) {
        console.log("first scene is removed");
    };
    __egretProto__.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createStartScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    __egretProto__.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    __egretProto__.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建开始菜单页面
     */
    __egretProto__.createStartScene = function () {
        this.stageH = this.rootStage.stageHeight;
        this.stageW = this.rootStage.stageWidth;
        var startMenuItem = new BitmapMenuItem("startMenu", "start_N", "start_S", this.onMenuItemClick, this);
        this.addChild(startMenuItem);
        startMenuItem.anchorX = startMenuItem.anchorY = 0.5;
        startMenuItem.x = this.stageW / 2;
        startMenuItem.y = this.stageH / 2;
    };
    __egretProto__.onMenuItemClick = function (name) {
        console.log(name + " is clicked");
        switch (name) {
            case "startMenu":
                var gameScene = new GameScene();
                gameScene.x = this.stageW;
                gameScene.y = 0;
                this.rootStage.addChild(gameScene);
                egret.Tween.get(gameScene).to({ x: 0 }, 200).call(this.onAnimationEnd, this);
                egret.Tween.get(this).to({ x: -this.stageW }, 200);
                break;
        }
    };
    __egretProto__.onAnimationEnd = function () {
        this.rootStage.removeChild(this);
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
