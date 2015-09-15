/**
 * Created by Sunday on 5/9/15.
 * 分享公共方法
 */
//微信签名
interface SignPackage {
    appid:string;
    noncestr:string;
    timestamp:number;
    signature:string;
    url:string;
}

class Share extends egret.DisplayObjectContainer {
    private os:string;
    private signUrl:string;
    private signPackage:SignPackage;

    public constructor() {
        super();
        this.init();
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    //初始化
    private  init():void {
        this.signUrl = 'http://studio.windra.in/chuangrui-race/backend/race_share_wx.php';

        var ua = navigator.userAgent.toLowerCase();
        if (/(micromessage)/i.test(ua)) {
            this.os = 'wx';
        } else if (/(iphone|ipod|ipad)/i.test(ua)) {
            this.os = 'ios';
        } else if(/(android)/i.test(ua)) {
            this.os = 'android';
        } else {
            this.os = 'pc';
        }

        console.log('init', this.os);
        if (this.os == 'wx') {
            this.getSignPackage();
        }
    }

    //获取微信签名
    private getSignPackage() {
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(this.signUrl);
        urlloader.load(req);
        req.method = egret.URLRequestMethod.GET;
        console.log('getSignPackage');
        urlloader.addEventListener(egret.Event.COMPLETE, (e)=> {
            this.signPackage = <SignPackage>JSON.parse(e.target.data);
            this.getWeiXinConfig();//下面会定义
        }, this);
    }

    //配置微信分享
    private getWeiXinConfig() {
        console.log('getWeiXinConfig');
        //配置参数
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = true;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = this.signPackage.appid;// 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp;// 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.noncestr;// 必填，生成签名的随机串
        bodyConfig.signature = this.signPackage.signature;// 必填，签名，见附录1
        bodyConfig.jsApiList = [// 必填，需要使用的JS接口列表
            // 所有要调用的 API 都要加到这个列表中
            //分享
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
        ];
        wx.config(bodyConfig);
        wx.ready(function() {
            wx.showOptionMenu({});
            console.log("ready in");
            Global.share.toWeiXin(
                'title',
                'desc',
                'link',
                'imgUrl',
                0
            );
        });
    }

    /**
     * 通过微信分享api
     * @title       		标题
     * @desc        		描述
     * @link        		游戏链接
     * @imgUrl      		分享icon链接
     * @type        		0：设置分享到朋友圈和朋友数据 1:设置分享到朋友数据 2：设置分享到朋友圈数据
     * @callback        	分享结束的回调
     */
    public toWeiXin(title,desc,link,imgUrl,type:number = 0, callback:Function = null):void {//微信分享
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = bodyMenuShareTimeline.title = title;
        //分享到朋友圈没有详情字段
        bodyMenuShareAppMessage.desc = desc;
        bodyMenuShareAppMessage.link = bodyMenuShareTimeline.link = link;
        bodyMenuShareAppMessage.imgUrl = bodyMenuShareTimeline.imgUrl = imgUrl;
        if (callback) {
            bodyMenuShareAppMessage.success = bodyMenuShareTimeline.success = callback;
        }

        if(type == 0){
            wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
            wx.onMenuShareTimeline(bodyMenuShareTimeline);
        }else if(type == 1){
            wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        }else if(type == 2){
            wx.onMenuShareTimeline(bodyMenuShareTimeline);
        }
    }
}