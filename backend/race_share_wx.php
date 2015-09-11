<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/9/11
 * Time: 上午10:25
 */

require_once "lib/WxPay.Config.php";
require_once "lib/WxPay.JsApiPay.php";
require_once "lib/wechat.class.php";
require_once "lib/errCode.php";

$opt = array(
    'token' => WxPayConfig::TOKEN,
    'appid' => WxPayConfig::APPID,
    'appsecret' => WxPayConfig::APPSECRET
);

//JSSDK签名
$we = new Wechat($opt);
$auth = $we->checkAuth();
$js_ticket = $we->getJsTicket();
if (!$js_ticket) {
    echo json_encode(['code' => '401', 'msg' => ErrCode::getErrText($we->errCode)]);
    exit;
}
$url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$js_sign = $we->getJsSign($url);

?>


<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
    // 需要自己自定义以下变量
    var _title = '【分享】警惕这些身体求救信号';
    var _desc = '困了就要睡觉，渴了就要喝水，累了就要休息，烦了就要发泄……这些我们都明白，其实有时候身体就会向你发出这样一些健康信号，可惜的是，很多人往往不在意！';
    var _link = 'http://mp.weixin.qq.com/s?biz=MjM5MTIxMzYxMQ==&mid=207223086&idx=1&sn=08bf703c6750bfc88de4317ee1d2d9e6#rd';
    var _imgUrl = 'http://mmbiz.qpic.cn/mmbiz/OvWLC4Ooz2bM8cePicfRaRk0ibWvMH7zvr2ARsDF36D9Q3U2kJuiaAR1FusBKiaCJ7h598NjaNYRuicicQTBpr3dFcbg/640?tp=webp';

    wx.config({
        debug: false,
        appId: '<?php echo $js_sign["appId"];?>',
        timestamp: <?php echo $js_sign["timestamp"];?>,
        nonceStr: '<?php echo $js_sign["nonceStr"];?>',
        signature: '<?php echo $js_sign["signature"];?>',
        jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',
            'openLocation',
            'getLocation',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    });

    wx.ready(function () {
        // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
        document.querySelector('#checkJsApi').onclick = function () {
            wx.checkJsApi({
                jsApiList: [
                    'getLocation',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ],
                success: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };

        // 2. 分享接口
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
        document.querySelector('#onMenuShareAppMessage').onclick = function () {
            wx.onMenuShareAppMessage({
                title: _title,
                desc: _desc,
                link: _link,
                imgUrl: _imgUrl,
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    alert('用户点击发送给朋友');
                },
                success: function (res) {
                    alert('已分享');
                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
            alert('已注册获取“发送给朋友”状态事件');
        };

        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        document.querySelector('#onMenuShareTimeline').onclick = function () {
            wx.onMenuShareTimeline({
                title: _title,
                link: _link,
                imgUrl: _imgUrl,
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    alert('用户点击分享到朋友圈');
                },
                success: function (res) {
                    alert('已分享');
                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
            alert('已注册获取“分享到朋友圈”状态事件');
        };

        //初始化数据
        var shareData = {
            title: _title,
            desc: _desc,
            link: _link,
            imgUrl: _imgUrl
        };
        wx.onMenuShareAppMessage(shareData);//默认分享朋友
        wx.onMenuShareTimeline(shareData);//默认分享朋友圈
    });

    wx.error(function (res) {
        alert(res.errMsg);
    });
</script>
