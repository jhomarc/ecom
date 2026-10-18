<?php
declare(strict_types=1);
$host='127.0.0.1'; $db='store_demo'; $user='root'; $pass=''; $charset='utf8mb4';
try {
 $pdo=new PDO("mysql:host=$host;dbname=$db;charset=$charset",$user,$pass,[
  PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES=>false
 ]);
} catch(PDOException $e) { error_log($e->getMessage()); http_response_code(500); exit('Database connection failed. Check config/db.php and make sure MySQL is running.'); }
