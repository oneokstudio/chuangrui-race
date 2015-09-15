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


if (isset($_GET['url'])) {
    //JSSDK签名
    $we = new Wechat($opt);
    $auth = $we->checkAuth();
    $js_ticket = $we->getJsTicket();
    if (!$js_ticket) {
        echo json_encode(['code' => '401', 'msg' => ErrCode::getErrText($we->errCode)]);
        exit;
    }
//    $url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    $js_sign = $we->getJsSign($_GET['url']);

    echo json_encode($js_sign);
} else {
    echo json_encode(['code' => '400', 'msg' => '请求非法']);
}


?>
