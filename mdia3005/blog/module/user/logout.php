<?php
	require_once("../../etc/settings.php");
	if(isset($_SESSION['ui'])){
    unset($_SESSION['ui']);
    echo true;
  }else{
     echo false;
  }
?>