/**
 * Created by Sunday on 5/9/15.
 * 分享公共方法
 */
//微信签名
interface SignPackage {
    appId:string;
    nonceStr:string;
    timestamp:number;
    signature:string;
    url:string;
}
//分享数据
interface ShareData {
    title:string;
    desc:string;
    link:string;
    imgUrl:string;
}

class Share extends egret.DisplayObjectContainer {
    private os:string;
    private signUrl:string;
    private signPackage:SignPackage;
    private shareData:ShareData;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    //初始化
    private  init():void {
        this.shareData.title = '';
        this.shareData.desc = '';
        this.shareData.link = '';
        this.shareData.imgUrl = '';

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
        urlloader.addEventListener(egret.Event.COMPLETE, (e)=> {
            this.signPackage = <SignPackage>JSON.parse(e.target.data);
            this.getWeiXinConfig();//下面会定义
        }, this);
    }

    //配置微信分享
    private getWeiXinConfig() {
        //配置参数
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = true;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = this.signPackage.appId;// 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp;// 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.nonceStr;// 必填，生成签名的随机串
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
        this.toWeiXin(
            this.shareData.title,
            this.shareData.desc,
            this.shareData.link,
            this.shareData.imgUrl,
            0
        );
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
        this.shareData.title = title;
        this.shareData.desc = desc;
        this.shareData.link = link;
        this.shareData.imgUrl = imgUrl;
        var _this = this;
        wx.ready(function(){
            var bodyMenuShareTimeline = new BodyMenuShareTimeline();
            var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
            bodyMenuShareAppMessage.title = bodyMenuShareTimeline.title = _this.shareData.title;
            bodyMenuShareAppMessage.desc = bodyMenuShareTimeline.desc = _this.shareData.desc;
            bodyMenuShareAppMessage.link = bodyMenuShareTimeline.link = _this.shareData.link;
            bodyMenuShareAppMessage.imgUrl = bodyMenuShareTimeline.imgUrl = _this.shareData.imgUrl;
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

        })
    }
}