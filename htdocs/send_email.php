<?php
//ini_set( 'display_errors', 1 );

//init
define('SAVE_FILE_PATH', './log/');


class SendEmail {
  
  function save( $file_name, $data ) {
    $fp = fopen( SAVE_FILE_PATH . $file_name, 'w');
    fwrite( $fp, $data );
    fclose( $fp );
  }
  
}

$send_email = new SendEmail();


//vars
//var_dump($_POST);
//$name = $send_email->getPostData( $_POST['name'] );
//$email = $_POST['email'];
//$page = $_POST['page'];

$data = array();

foreach( $_POST as $key => $value ) {
  ${$key} = $value;
  $data[ $key ] = $value;
  //echo htmlspecialchars( $key ) . "=" . htmlspecialchars($value) . "<BR>";
}


//
$week = array('日','月','火','水','木','金','土');
$time = date("Y年n月j日", time()) . '（' . $week[date("w", time())] . '）';
$time .= date("H時i分s秒", time());

$data['time'] = $time;


//
/*
$textData = '';
$textData .= "ページ：{$page}\n";
$textData .= "時刻：{$time}\n";
$textData .= "お名前：{$name}\n";
$textData .= "メールアドレス：{$email}\n";
*/

$json = json_encode( $data );

$send_email->save(
  date("Ymd_His", time()) . '.json',
  $json
);



$result = $data;
$result['status'] = 1;
$result = json_encode( $result );

header('Content-Type: text/javascript; charset=utf-8');
echo $_GET['callback'] . '(' . $result . ')';


?>