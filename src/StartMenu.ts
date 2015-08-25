/**
 * Created by Mr.Lan on 2015/8/25.
 */
class StartMenu extends egret.DisplayObjectContainer {

    /**
     * ���ؽ��Ƚ���
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //���ü��ؽ��Ƚ���
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //��ʼ��Resource��Դ���ؿ�
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * �����ļ��������,��ʼԤ����preload��Դ�顣
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload��Դ��������
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createStartScene();
        }
    }

    /**
     * ��Դ����س���
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //���Լ���ʧ�ܵ���Ŀ
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload��Դ����ؽ���
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * ������ʼ�˵�ҳ��
     */
    private createStartScene() {
        var stageH = this.stage.stageHeight;
        var stageW = this.stage.stageWidth;
        var textField:egret.TextField = new egret.TextField();
        textField.anchorX = textField.anchorY = 0.5;
        textField.x = stageW / 2;
        textField.y = stageH / 2;
        textField.text = "Start Game";
        this.addChild(textField);
    }
}
