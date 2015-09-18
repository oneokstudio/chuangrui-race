<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/9/9
 * Time: 上午11:55
 */


if (isset($_GET['openid'])) {
    try {
        $db = new PDO('mysql:host=127.0.0.1;dbname=race', 'root', 'zxc');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $db->prepare("select scores.openid, scores.score, users.nickname, users.headimgurl
                              from scores, users where scores.openid = users.openid order by scores.score desc limit 50");
        $stmt->execute();
        $db = null;

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $flag = 0;
        for ($i = 0; $i < sizeof($results); $i++) {
            if ($results[$i]['openid'] == $_GET['openid']) {
                $flag = $i + 1;
                break;
            }
        }

        $return = ['code' => '200', 'rank_list' => array_map(utf8_encode, $results), 'my_rank' => $flag];
        echo json_encode($return);
    } catch (PDOException $e) {
        echo json_encode(['code' => '500', 'msg' => '服务器繁忙，请稍后重试']);
        die();
    }
} else {
    echo json_encode(['code' => '400', 'msg' => '请求不合法']);
}



?>