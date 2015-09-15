<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/9/9
 * Time: 上午11:55
 */

date_default_timezone_set('Asia/Shanghai');


if (isset($_POST['openid']) && isset($_POST['score'])) {
    try {
        $db = new PDO('mysql:host=127.0.0.1;dbname=race', 'root', 'zxc');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $db->prepare("select * from users where openid = :openid");
        $stmt->bindParam(':openid', $_POST['openid'], PDO::PARAM_STR);
        $stmt->execute();

        if ($stmt->rowCount()) {
            $stmt = $db->prepare("select score from scores where openid = :openid");
            $stmt->bindParam(':openid', $_POST['openid'], PDO::PARAM_STR);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result && $result['score'] < $_POST['score']) {
                $stmt = $db->prepare("replace into scores(openid, score, ctime) values(:openid, :score, :ctime)");
                $stmt->bindParam(':openid', $_POST['openid'], PDO::PARAM_STR);
                $stmt->bindParam(':score', $_POST['score'], PDO::PARAM_INT);
                $stmt->bindParam(':ctime', time(), PDO::PARAM_INT);
                $stmt->execute();
            }

            $db = null;
            echo json_encode(['code' => '200', 'msg' => '提交成功']);
        } else {
            $db = null;
            echo json_encode(['code' => '400', 'msg' => '未找到该玩家信息']);
        }

    } catch (PDOException $e) {
        echo json_encode(['code' => '500', 'msg' => '服务器繁忙，请稍后重试']);
        die();
    }
} else {
    echo json_encode(['code' => '400', 'msg' => '请求不合法']);
}

?>