<?php
/**
 * Created by PhpStorm.
 * User: GG
 * Date: 2015/7/23
 * Time: 15:50
 */
require_once "lib/WxPay.Config.php";
require_once "lib/wechat.class.php";
require_once 'lib/errCode.php';

$opt = array(
    'appid' => WxPayConfig::APPID,    //填写高级调用功能的appid
    'appsecret' => WxPayConfig::APPSECRET //填写高级调用功能的密钥
);

$we = new Wechat($opt);
$auth = $we->checkAuth();
$js_ticket = $we->getJsTicket();
if (!$js_ticket) {
    echo "获取js_ticket失败！<br>";
    echo '错误码：' . $we->errCode;
    echo ' 错误原因：' . ErrCode::getErrText($weObj->errCode);
    exit;
}
$url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
if(isset($_GET["url"])&&!empty($_GET["url"]))
    $url = $_GET["url"];
$js_sign = $we->getJsSign($url);
echo json_encode($js_sign);