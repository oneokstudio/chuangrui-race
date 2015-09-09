<?php
/**
 * Created by PhpStorm.
 * User: GG
 * Date: 2015/7/24
 * Time: 16:55
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
    echo "获取js_ticket失败！<br>";
    echo '错误码：' . $we->errCode;
    echo '错误原因：' . ErrCode::getErrText($weObj->errCode);
    exit;
}
$url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$js_sign = $we->getJsSign($url);

//微信支付
//1.获取用户openid
$tools = new JsApiPay();
$openId = $tools->GetOpenid();

//2.统一下单
$input = new WxPayUnifiedOrder();
$input->SetBody("ipad mini 16G 白色");
$input->SetAttach("test");
$input->SetOut_trade_no(WxPayConfig::MCHID . date("YmdHis"));
$input->SetTotal_fee("1");
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag("test");
$input->SetNotify_url(WxPayConfig::NOTIFY_URL);
$input->SetTrade_type("JSAPI");
$input->SetOpenid($openId);
$order = WxPayApi::unifiedOrder($input);
$jsApiParameters = $tools->GetJsApiParameters($order);
//var_dump($jsApiParameters);
$jsParams = json_decode($jsApiParameters, true);

//3.获取共享收货地址js函数参数
$editAddress = $tools->GetEditAddressParameters();

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Php测试微信JSSDK接口(Author:d8q8,QQ:17624522)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    <style>
        .btn {
            background-color: #6697FF;
            color: #ffffff;
            border: none;
            padding: 10px;
            font-size: 16px;
            display: block;
            width: 100%;
            border-radius: 5px;
        }
        h2 span {
            font-size: 14px;
        }
        ins{
            color:#f00;
            font-size:14px;
            text-decoration: none;
        }
    </style>
</head>
<body>
<div>
    <h2>Php测试微信JSSDK接口<span>(Author:d8q8,QQ:17624522)</span></h2>

    <h3 id="menu-basic">1、基础接口</h3>

    <p class="desc">判断当前客户端是否支持指定JS接口</p>
    <button class="btn btn_primary" id="checkJsApi">checkJsApi</button>

    <h3 id="menu-share">分享接口</h3>

    <p class="desc">获取“分享到朋友圈”按钮点击状态及自定义分享内容接口</p>
    <button class="btn btn_primary" id="onMenuShareTimeline">onMenuShareTimeline</button>
    <p class="desc">获取“分享给朋友”按钮点击状态及自定义分享内容接口</p>
    <button class="btn btn_primary" id="onMenuShareAppMessage">onMenuShareAppMessage</button>
    <p class="desc">获取“分享到QQ”按钮点击状态及自定义分享内容接口</p>
    <button class="btn btn_primary" id="onMenuShareQQ">onMenuShareQQ</button>
    <p class="desc">获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口</p>
    <button class="btn btn_primary" id="onMenuShareWeibo">onMenuShareWeibo</button>

    <h3 id="menu-image">图像接口</h3>

    <p class="desc">拍照或从手机相册中选图接口</p>
    <button class="btn btn_primary" id="chooseImage">chooseImage</button>
    <p class="desc">预览图片接口</p>
    <button class="btn btn_primary" id="previewImage">previewImage</button>
    <p class="desc">上传图片接口</p>
    <button class="btn btn_primary" id="uploadImage">uploadImage</button>
    <p class="desc">下载图片接口</p>
    <button class="btn btn_primary" id="downloadImage">downloadImage</button>

    <h3 id="menu-voice">音频接口</h3>

    <p class="desc">开始录音接口</p>
    <button class="btn btn_primary" id="startRecord">startRecord</button>
    <p class="desc">停止录音接口</p>
    <button class="btn btn_primary" id="stopRecord">stopRecord</button>
    <p class="desc">播放语音接口</p>
    <button class="btn btn_primary" id="playVoice">playVoice</button>
    <p class="desc">暂停播放接口</p>
    <button class="btn btn_primary" id="pauseVoice">pauseVoice</button>
    <p class="desc">停止播放接口</p>
    <button class="btn btn_primary" id="stopVoice">stopVoice</button>
    <p class="desc">上传语音接口</p>
    <button class="btn btn_primary" id="uploadVoice">uploadVoice</button>
    <p class="desc">下载语音接口</p>
    <button class="btn btn_primary" id="downloadVoice">downloadVoice</button>

    <h3 id="menu-smart">智能接口</h3>

    <p class="desc">识别音频并返回识别结果接口</p>
    <button class="btn btn_primary" id="translateVoice">translateVoice</button>

    <h3 id="menu-device">设备信息接口</h3>

    <p class="desc">获取网络状态接口</p>
    <button class="btn btn_primary" id="getNetworkType">getNetworkType</button>

    <h3 id="menu-location">地理位置接口<ins>(打开手机定位测试)</ins></h3>

    <p class="desc">使用微信内置地图查看位置接口</p>
    <button class="btn btn_primary" id="openLocation">openLocation</button>
    <p class="desc">获取地理位置接口</p>
    <button class="btn btn_primary" id="getLocation">getLocation</button>

    <h3 id="menu-webview">界面操作接口</h3>

    <p class="desc">隐藏右上角菜单接口</p>
    <button class="btn btn_primary" id="hideOptionMenu">hideOptionMenu</button>
    <p class="desc">显示右上角菜单接口</p>
    <button class="btn btn_primary" id="showOptionMenu">showOptionMenu</button>
    <p class="desc">关闭当前网页窗口接口</p>
    <button class="btn btn_primary" id="closeWindow">closeWindow</button>
    <p class="desc">批量隐藏功能按钮接口</p>
    <button class="btn btn_primary" id="hideMenuItems">hideMenuItems</button>
    <p class="desc">批量显示功能按钮接口</p>
    <button class="btn btn_primary" id="showMenuItems">showMenuItems</button>
    <p class="desc">隐藏所有非基础按钮接口</p>
    <button class="btn btn_primary" id="hideAllNonBaseMenuItem">hideAllNonBaseMenuItem</button>
    <p class="desc">显示所有功能按钮接口</p>
    <button class="btn btn_primary" id="showAllNonBaseMenuItem">showAllNonBaseMenuItem</button>

    <h3 id="menu-address">收获地址</h3>

    <p class="desc">编辑并获取收货地址</p>
    <button class="btn btn_primary" id="editAddress">editAddress</button>

    <h3 id="menu-scan">微信扫一扫</h3>

    <p class="desc">调起微信扫一扫接口</p>
    <button class="btn btn_primary" id="scanQRCode0">scanQRCode(微信处理结果)</button>
    <button class="btn btn_primary" id="scanQRCode1">scanQRCode(直接返回结果)</button>

    <h3 id="menu-shopping">微信小店接口</h3>

    <p class="desc">跳转微信商品页接口</p>
    <button class="btn btn_primary" id="openProductSpecificView">openProductSpecificView</button>

    <h3 id="menu-card">微信卡券接口</h3>

    <p class="desc">批量添加卡券接口</p>
    <button class="btn btn_primary" id="addCard">addCard</button>
    <p class="desc">调起适用于门店的卡券列表并获取用户选择列表</p>
    <button class="btn btn_primary" id="chooseCard">chooseCard</button>
    <p class="desc">查看微信卡包中的卡券接口</p>
    <button class="btn btn_primary" id="openCard">openCard</button>

    <h3 id="menu-pay">微信支付接口</h3>

    <p class="desc">发起一个微信支付请求</p>
    <button class="btn btn_primary" id="chooseWXPay">chooseWXPay</button>
</div>
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
    var _title = '【分享】警惕这些身体求救信号';
    var _desc = '困了就要睡觉，渴了就要喝水，累了就要休息，烦了就要发泄……这些我们都明白，其实有时候身体就会向你发出这样一些健康信号，可惜的是，很多人往往不在意！';
    var _link = 'http://mp.weixin.qq.com/s?biz=MjM5MTIxMzYxMQ==&mid=207223086&idx=1&sn=08bf703c6750bfc88de4317ee1d2d9e6#rd';
    var _imgUrl = 'http://mmbiz.qpic.cn/mmbiz/OvWLC4Ooz2bM8cePicfRaRk0ibWvMH7zvr2ARsDF36D9Q3U2kJuiaAR1FusBKiaCJ7h598NjaNYRuicicQTBpr3dFcbg/640?tp=webp';
    /*
     * 注意：
     * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
     * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
     * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
     *
     * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
     * 邮箱地址：weixin-open@qq.com
     * 邮件主题：【微信JS-SDK反馈】具体问题
     * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
     */
    wx.config({
        debug: true,
        appId: '<?php echo $js_sign['appid']; ?>', // 必填，公众号的唯一标识
        timestamp: <?php echo $js_sign['timestamp']; ?>, // 必填，生成签名的时间戳，切记时间戳是整数型，别加引号
        nonceStr: '<?php echo $js_sign['noncestr']; ?>', // 必填，生成签名的随机串
        signature: '<?php echo $js_sign['signature']; ?>', // 必填，签名，见附录1
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        ]
    });

    wx.ready(function () {
        // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
        document.querySelector('#checkJsApi').onclick = function () {
            wx.checkJsApi({
                jsApiList: [
                    'getNetworkType',
                    'previewImage'
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

        // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
        document.querySelector('#onMenuShareQQ').onclick = function () {
            wx.onMenuShareQQ({
                title: _title,
                desc: _desc,
                link: _link,
                imgUrl: _imgUrl,
                trigger: function (res) {
                    alert('用户点击分享到QQ');
                },
                complete: function (res) {
                    alert(JSON.stringify(res));
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
            alert('已注册获取“分享到 QQ”状态事件');
        };

        // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
        document.querySelector('#onMenuShareWeibo').onclick = function () {
            wx.onMenuShareWeibo({
                title: _title,
                desc: _desc,
                link: _link,
                imgUrl: _imgUrl,
                trigger: function (res) {
                    alert('用户点击分享到微博');
                },
                complete: function (res) {
                    alert(JSON.stringify(res));
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
            alert('已注册获取“分享到微博”状态事件');
        };


        // 3 智能接口
        var voice = {
            localId: '',
            serverId: ''
        };
        // 3.1 识别音频并返回识别结果
        document.querySelector('#translateVoice').onclick = function () {
            if (voice.localId == '') {
                alert('请先使用 startRecord 接口录制一段声音');
                return;
            }
            wx.translateVoice({
                localId: voice.localId,
                complete: function (res) {
                    if (res.hasOwnProperty('translateResult')) {
                        alert('识别结果：' + res.translateResult);
                    } else {
                        alert('无法识别');
                    }
                }
            });
        };

        // 4 音频接口
        // 4.2 开始录音
        document.querySelector('#startRecord').onclick = function () {
            wx.startRecord({
                cancel: function () {
                    alert('用户拒绝授权录音');
                }
            });
        };

        // 4.3 停止录音
        document.querySelector('#stopRecord').onclick = function () {
            wx.stopRecord({
                success: function (res) {
                    voice.localId = res.localId;
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };

        // 4.4 监听录音自动停止
        wx.onVoiceRecordEnd({
            complete: function (res) {
                voice.localId = res.localId;
                alert('录音时间已超过一分钟');
            }
        });

        // 4.5 播放音频
        document.querySelector('#playVoice').onclick = function () {
            if (voice.localId == '') {
                alert('请先使用 startRecord 接口录制一段声音');
                return;
            }
            wx.playVoice({
                localId: voice.localId
            });
        };

        // 4.6 暂停播放音频
        document.querySelector('#pauseVoice').onclick = function () {
            wx.pauseVoice({
                localId: voice.localId
            });
        };

        // 4.7 停止播放音频
        document.querySelector('#stopVoice').onclick = function () {
            wx.stopVoice({
                localId: voice.localId
            });
        };

        // 4.8 监听录音播放停止
        wx.onVoicePlayEnd({
            complete: function (res) {
                alert('录音（' + res.localId + '）播放结束');
            }
        });

        // 4.8 上传语音
        document.querySelector('#uploadVoice').onclick = function () {
            if (voice.localId == '') {
                alert('请先使用 startRecord 接口录制一段声音');
                return;
            }
            wx.uploadVoice({
                localId: voice.localId,
                success: function (res) {
                    alert('上传语音成功，serverId 为' + res.serverId);
                    voice.serverId = res.serverId;
                }
            });
        };

        // 4.9 下载语音
        document.querySelector('#downloadVoice').onclick = function () {
            if (voice.serverId == '') {
                alert('请先使用 uploadVoice 上传声音');
                return;
            }
            wx.downloadVoice({
                serverId: voice.serverId,
                success: function (res) {
                    alert('下载语音成功，localId 为' + res.localId);
                    voice.localId = res.localId;
                }
            });
        };

        // 5 图片接口
        // 5.1 拍照、本地选图
        var images = {
            localId: [],
            serverId: []
        };
        document.querySelector('#chooseImage').onclick = function () {
            wx.chooseImage({
                success: function (res) {
                    images.localId = res.localIds;
                    alert('已选择 ' + res.localIds.length + ' 张图片');
                }
            });
        };

        // 5.2 图片预览
        document.querySelector('#previewImage').onclick = function () {
            wx.previewImage({
                current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
                urls: [
                    'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
                    'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
                    'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
                ]
            });
        };

        // 5.3 上传图片
        document.querySelector('#uploadImage').onclick = function () {
            if (images.localId.length == 0) {
                alert('请先使用 chooseImage 接口选择图片');
                return;
            }
            var i = 0, length = images.localId.length;
            images.serverId = [];
            function upload() {
                wx.uploadImage({
                    localId: images.localId[i],
                    success: function (res) {
                        i++;
                        alert('已上传：' + i + '/' + length);
                        images.serverId.push(res.serverId);
                        if (i < length) {
                            upload();
                        }
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            }

            upload();
        };

        // 5.4 下载图片
        document.querySelector('#downloadImage').onclick = function () {
            if (images.serverId.length === 0) {
                alert('请先使用 uploadImage 上传图片');
                return;
            }
            var i = 0, length = images.serverId.length;
            images.localId = [];
            function download() {
                wx.downloadImage({
                    serverId: images.serverId[i],
                    success: function (res) {
                        i++;
                        alert('已下载：' + i + '/' + length);
                        images.localId.push(res.localId);
                        if (i < length) {
                            download();
                        }
                    }
                });
            }

            download();
        };

        // 6 设备信息接口
        // 6.1 获取当前网络状态
        document.querySelector('#getNetworkType').onclick = function () {
            wx.getNetworkType({
                success: function (res) {
                    alert(res.networkType);
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };

        // 7 地理位置接口
        // 7.1 查看地理位置
        document.querySelector('#openLocation').onclick = function () {
            wx.getLocation({
                success: function (res) {
                    //alert(JSON.stringify(res));
                    wx.openLocation({
                        latitude: res.latitude,
                        longitude: res.longitude,
                        name: '经纬度(' + res.longitude + ',' + res.latitude + ')',
                        address: '你的地址可以按经纬度获取逆地址解析即可.',//从其他地图按经纬度获取逆地址解析就可以了
                        scale: 14,
                        infoUrl: 'http://www.shinycg.com'
                    });
                },
                cancel: function (res) {
                    alert('用户拒绝授权获取地理位置');
                }
            });
        };

        // 7.2 获取当前地理位置
        document.querySelector('#getLocation').onclick = function () {
            wx.getLocation({
                success: function (res) {
                    alert(JSON.stringify(res));
                },
                cancel: function (res) {
                    alert('用户拒绝授权获取地理位置');
                }
            });
        };

        // 8 界面操作接口
        // 8.1 隐藏右上角菜单
        document.querySelector('#hideOptionMenu').onclick = function () {
            wx.hideOptionMenu();
        };

        // 8.2 显示右上角菜单
        document.querySelector('#showOptionMenu').onclick = function () {
            wx.showOptionMenu();
        };

        // 8.3 批量隐藏菜单项
        document.querySelector('#hideMenuItems').onclick = function () {
            wx.hideMenuItems({
                menuList: [
                    'menuItem:readMode', // 阅读模式
                    'menuItem:share:timeline', // 分享到朋友圈
                    'menuItem:copyUrl' // 复制链接
                ],
                success: function (res) {
                    alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };

        // 8.4 批量显示菜单项
        document.querySelector('#showMenuItems').onclick = function () {
            wx.showMenuItems({
                menuList: [
                    'menuItem:readMode', // 阅读模式
                    'menuItem:share:timeline', // 分享到朋友圈
                    'menuItem:copyUrl' // 复制链接
                ],
                success: function (res) {
                    alert('已显示“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };

        // 8.5 隐藏所有非基本菜单项
        document.querySelector('#hideAllNonBaseMenuItem').onclick = function () {
            wx.hideAllNonBaseMenuItem({
                success: function () {
                    alert('已隐藏所有非基本菜单项');
                }
            });
        };

        // 8.6 显示所有被隐藏的非基本菜单项
        document.querySelector('#showAllNonBaseMenuItem').onclick = function () {
            wx.showAllNonBaseMenuItem({
                success: function () {
                    alert('已显示所有非基本菜单项');
                }
            });
        };

        // 8.7 关闭当前窗口
        document.querySelector('#closeWindow').onclick = function () {
            wx.closeWindow();
        };

        // 9 微信原生接口
        // 9.1.1 扫描二维码并返回结果
        document.querySelector('#scanQRCode0').onclick = function () {
            wx.scanQRCode();
        };
        // 9.1.2 扫描二维码并返回结果
        document.querySelector('#scanQRCode1').onclick = function () {
            wx.scanQRCode({
                needResult: 1,
                desc: 'scanQRCode desc',
                success: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };

        //9.1.3 编辑收货地址接口
        document.querySelector('#editAddress').onclick = function () {
            WeixinJSBridge.invoke(
                'editAddress',
                <?php echo $editAddress; ?>,
                function (res) {
                    var value1 = res.proviceFirstStageName;
                    var value2 = res.addressCitySecondStageName;
                    var value3 = res.addressCountiesThirdStageName;
                    var value4 = res.addressDetailInfo;
                    var tel = res.telNumber;

                    alert(value1 + value2 + value3 + value4 + ":" + tel);
                }
            );
        };

        // 10 微信支付接口
        // 10.1 发起一个支付请求
        document.querySelector('#chooseWXPay').onclick = function () {
            // 注意：此 Demo 使用 2.7 版本支付接口实现，建议使用此接口时参考微信支付相关最新文档。
            wx.chooseWXPay({
                timestamp: <?php echo $jsParams['timeStamp']; ?>,
                nonceStr: '<?php echo $jsParams['nonceStr']; ?>',
                package: '<?php echo $jsParams['package']; ?>',
                signType: '<?php echo $jsParams['signType']; ?>', // 注意：新版支付接口使用 MD5 加密
                paySign: '<?php echo $jsParams['paySign']; ?>'
            });
        };

        // 11.3  跳转微信商品页
        document.querySelector('#openProductSpecificView').onclick = function () {
            wx.openProductSpecificView({
                productId: 'pDF3iY_m2M7EQ5EKKKWd95kAxfNw'
            });
        };

        // 12 微信卡券接口
        // 12.1 添加卡券
        document.querySelector('#addCard').onclick = function () {
            wx.addCard({
                cardList: [
                    {
                        cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
                        cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f54dae85e7807cc9525ccc127b4796e021f05b33"}'
                    },
                    {
                        cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
                        cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f54dae85e7807cc9525ccc127b4796e021f05b33"}'
                    }
                ],
                success: function (res) {
                    alert('已添加卡券：' + JSON.stringify(res.cardList));
                }
            });
        };

        // 12.2 选择卡券
        document.querySelector('#chooseCard').onclick = function () {
            wx.chooseCard({
                cardSign: '97e9c5e58aab3bdf6fd6150e599d7e5806e5cb91',
                timestamp: 1417504553,
                nonceStr: 'k0hGdSXKZEj3Min5',
                success: function (res) {
                    alert('已选择卡券：' + JSON.stringify(res.cardList));
                }
            });
        };

        // 12.3 查看卡券
        document.querySelector('#openCard').onclick = function () {
            alert('您没有该公众号的卡券无法打开卡券。');
            wx.openCard({
                cardList: []
            });
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
</html>