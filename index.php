<?php ob_start();
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/9/15
 * Time: 下午8:55
 */


//require_once "backend/lib/WxPay.Config.php";
//require_once "backend/lib/wechat.class.php";
//
//
//$opt = array(
//    'appid' => WxPayConfig::APPID,    //填写高级调用功能的appid
//    'appsecret' => WxPayConfig::APPSECRET //填写高级调用功能的密钥
//);
//
//$we = new Wechat($opt);
//$redirectUrl = $we->getOauthRedirect("http://race.meedoo.cc/backend/callback.php");

//echo $redirectUrl;

//header("Location:" . $redirectUrl);
header('Location: http://race.meedoo.cc/release/html5/1443256816/?openid=0');
ob_end_flush();
