/**
 * Created by Mr.Lan on 2015/8/25.
 */
//百度统计
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?d27eb011cfaaf4346491183b633dcddd";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.rootStage = egret.MainContext.instance.stage;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
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
        //背景图片
        this.bgImage = new egret.Bitmap();
        this.bgImage.texture = RES.getRes("bgImage");
        this.bgImage.width = this.stageW;
        this.bgImage.height = this.stageH;
        this.addChild(this.bgImage);
        //开始游戏按钮
        var startMenuItem = new BitmapMenuItem("startMenu", "ImageSheet.startButton", this.onMenuItemClick, this);
        this.addChild(startMenuItem);
        startMenuItem.x = this.stageW / 2;
        startMenuItem.y = this.stageH / 2 - 150;
        //说明按钮
        var noticeMenuItem = new BitmapMenuItem("noticeMenu", "ImageSheet.noticeButton", this.onMenuItemClick, this);
        this.addChild(noticeMenuItem);
        noticeMenuItem.x = this.stageW / 2;
        noticeMenuItem.y = this.stageH / 2 + 110;
    };
    __egretProto__.onMenuItemClick = function (name) {
        switch (name) {
            case "startMenu":
                var gameScene = new GameScene();
                gameScene.x = this.stageW;
                gameScene.y = 0;
                this.rootStage.addChild(gameScene);
                egret.Tween.get(gameScene).to({ x: 0 }, 200).call(this.onAnimationEnd, this);
                egret.Tween.get(this).to({ x: -this.stageW }, 200);
                _hmt.push(["_trackEvent", "button", "click", "start"]);
                break;
            case "noticeMenu":
                var noticeScene = new NoticeScene();
                noticeScene.x = this.stageW;
                noticeScene.y = 0;
                this.rootStage.addChild(noticeScene);
                egret.Tween.get(noticeScene).to({ x: 0 }, 200).call(this.onAnimationEnd, this);
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
