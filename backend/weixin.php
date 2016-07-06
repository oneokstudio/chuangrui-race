<?php
/**
 * Created by PhpStorm.
 * User: GG
 * Date: 2015/7/23
 * Time: 15:13
 */
require_once "lib/WxPay.Config.php";
require_once "lib/wechat.class.php";
$options = array(
    'token'=>WxPayConfig::TOKEN, //填写你设定的key
    'encodingaeskey'=>WxPayConfig::ENCODINGAESKEY, //填写加密用的EncodingAESKey
    'appid'=>WxPayConfig::APPID, //填写高级调用功能的app id, 请在微信开发模式后台查询
    'appsecret'=>WxPayConfig::APPSECRET //填写高级调用功能的密钥
);

$weObj = new Wechat($options);
$weObj->valid(true);//明文或兼容模式可以在接口验证通过后注释此句，但加密模式一定不能注释，否则会验证失败
file_put_contents('test.log', $_GET['echostr']);
echo $_GET['echostr'];
