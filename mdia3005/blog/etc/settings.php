<?php
session_start();
require_once("mysql_functions.lib.php");

//set host 
$mysql_host = "localhost";

#set mysql user
$mysql_user = "root";

#set mysql password
$mysql_user_password = "";

#set database
$mysql_database = "cblog";

#apply settings
$db = new Db_Functions();
$db->set_Connection($mysql_user, $mysql_user_password, $mysql_database, $mysql_host);
$db->connect();

?>