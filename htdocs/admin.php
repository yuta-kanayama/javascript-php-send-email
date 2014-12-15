<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>JavaScript PHP send Email</title>

<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">

<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<![endif]-->

</head>
<body>


<!-- .container -->
<div class="container">

<?php

//init
define('SAVE_FILE_PATH', './log/');


if( $dir = opendir( SAVE_FILE_PATH ) ) {
  
  echo '<hr />';
  
  while( false !== ($file = readdir($dir)) ) {
    //if( $file != "." && $file != ".." && 0 != strpos( $file, '.' ) ) {
    if( 0 < strpos( $file, '.json' ) ) {
      $files[] = $file;
    }
  }
  closedir($dir);
  
  rsort($files);
  
  foreach( $files as $file ) {
    $json = @file_get_contents( SAVE_FILE_PATH . $file );
    $contents = json_decode( $json, true );
    //$contents = nl2br( $contents );
    $contents = print_r( $contents, true );
    echo <<<EOM
<section>
  <!-- 
  <header>
    <h1></h1>
  </header>
   -->
  <div class="contents">
    <p></p>{$file}<br />
    <p>{$json->time}</p>
    <pre>{$contents}</pre>
  </div>
</section>
<hr />
EOM;
  }
  
}

?>

<!-- /.container --></div>


<!-- javascript -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
<script src="admin.js"></script>

</body>
</html>