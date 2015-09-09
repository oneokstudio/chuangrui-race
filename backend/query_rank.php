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
        $stmt = $db->prepare("select openid, score from scores order by score desc limit 50");
        $stmt->execute();
        $db = null;

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $ids = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

        if ($key = array_search($_GET['openid'], $ids)) {
            $flag = $key + 1;
        } else {
            $flag = 0;
        }

        $return = ['code' => '200', 'rank_list' => $results, 'my_rank' => $flag];
        echo json_encode($return);
    } catch (PDOException $e) {
        echo json_encode(['code' => '500', 'msg' => '服务器繁忙，请稍后重试']);
        die();
    }
} else {
    echo json_encode(['code' => '400', 'msg' => '请求不合法']);
}



?>