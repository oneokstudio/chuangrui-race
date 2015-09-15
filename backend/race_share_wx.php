<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/9/11
 * Time: 上午10:25
 */

//require_once "lib/WxPay.Config.php";
//require_once "lib/WxPay.JsApiPay.php";
//require_once "lib/wechat.class.php";
//require_once "lib/errCode.php";
//
//$opt = array(
//    'token' => WxPayConfig::TOKEN,
//    'appid' => WxPayConfig::APPID,
//    'appsecret' => WxPayConfig::APPSECRET
//);
//
////JSSDK签名
//$we = new Wechat($opt);
//$auth = $we->checkAuth();
//$js_ticket = $we->getJsTicket();
//if (!$js_ticket) {
//    echo json_encode(['code' => '401', 'msg' => ErrCode::getErrText($we->errCode)]);
//    exit;
//}
//$url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
//$js_sign = $we->getJsSign($url);
//
//echo json_encode($js_sign);


require_once dirname(__FILE__) . '/vendor/autoload.php';

$client = new Predis\Client();
$client->set('foo', 'bar');
$value = $client->get('foo');
echo "value = $value";

?>
