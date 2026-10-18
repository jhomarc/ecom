<?php
if(session_status()!==PHP_SESSION_ACTIVE) session_start();
function e(?string $s): string { return htmlspecialchars($s??'',ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8'); }
function token(): string { if(empty($_SESSION['csrf'])) $_SESSION['csrf']=bin2hex(random_bytes(32)); return $_SESSION['csrf']; }
function check_token(): void { if(!hash_equals(token(),(string)($_POST['csrf']??''))){http_response_code(419);exit('Session expired. Refresh and try again.');} }
function cart_count(): int { return array_sum(array_map('intval',$_SESSION['cart']??[])); }
function money($n): string { return '$'.number_format((float)$n,2); }
