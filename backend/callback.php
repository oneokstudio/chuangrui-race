<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/9/9
 * Time: 上午11:40
 */

require_once "lib/WxPay.Config.php";
require_once "lib/wechat.class.php";


$opt = array(
    'appid' => WxPayConfig::APPID,    //填写高级调用功能的appid
    'appsecret' => WxPayConfig::APPSECRET //填写高级调用功能的密钥
);

$we = new Wechat($opt);

if ($accessRtn = $we->getOauthAccessToken()) {
    if ($userInfo = $we->getOauthUserinfo($accessRtn['access_token'], $accessRtn['openid'])) {
        try {
            $db = new PDO('mysql:host=127.0.0.1;dbname=race', 'root', 'MeeDooDB2016');
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $db->prepare("replace into users(openid, nickname, sex, headimgurl) values(:openid, :nickname, :sex, :headimgurl)");

            $stmt->bindParam(':openid', $userInfo['openid'], PDO::PARAM_STR);
            $stmt->bindParam(':nickname', $userInfo['nickname'], PDO::PARAM_STR);
            $stmt->bindParam(':sex', $userInfo['sex'], PDO::PARAM_INT);
            $stmt->bindParam(':headimgurl', $userInfo['headimgurl'], PDO::PARAM_STR);
            $stmt->execute();
            $db = null;

            header('Location: http://race.meedoo.cc/release/html5/1443256816/?openid=' . $userInfo['openid']);
        } catch (PDOException $e) {
            echo json_encode(['code' => '500', 'msg' => '服务器繁忙，请稍后重试']);
            die();
        }
    } else {
        echo json_encode(['code' => '401', 'msg' => '获取用户信息失败']);
    }
} else {
    echo json_encode(['code' => '401', 'msg' => '获取token失败']);
}

?>