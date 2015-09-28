<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/9/18
 * Time: 上午10:03
 */

require_once './PhpExcel/PHPExcel.php';

date_default_timezone_set('Asia/Shanghai');

try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=race', 'root', 'zxc');
    $result = $db->query('SELECT users.nickname, users.headimgurl, scores.score FROM users, scores WHERE users.openid = scores.openid ORDER BY scores.score DESC ');
    $excel = new PHPExcel();
    $excel->getActiveSheet()->setCellValue('A1', '昵称');
    $excel->getActiveSheet()->setCellValue('B1', '分数');
    $excel->getActiveSheet()->setCellValue('C1', '头像');

    $i = 2;
    foreach ($result as $value) {
//        $encoding = mb_detect_encoding($value['nickname']);
        $excel->getActiveSheet()->setCellValue('A' . $i, $value['nickname']);
        $excel->getActiveSheet()->setCellValue('B' . $i, $value['score']);
        $excel->getActiveSheet()->setCellValue('C' . $i, $value['headimgurl']);
        $i++;
    }

    $filename = '排名信息.xlsx';
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename=$filename');
    header('Cache-Control: max-age=0');
    $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');
    $objWriter->save($filename);

    $db = null;
} catch (PDOException $e) {
    echo "can't connect to mysql";
}
