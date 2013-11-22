<?php
// For PHP 5 and up
$term = (!empty($_REQUEST['term']))? $_REQUEST['term']: '';
$all = (!empty($_REQUEST['all']))? $_REQUEST['all'] : '';
$author = (!empty($_REQUEST['author']))? $_REQUEST['author']: '';
//$handle = fopen("https://webster.cs.washington.edu/cse154/labs/ajax/urban.php?term=$term&all=$all&author=$author", "rb");
$handle = fopen("http://localhost/info2180/lab7/hm.php", "rb");
$contents = stream_get_contents($handle);
if(!empty($contents)){
	print $contents;
}else{
	echo 'resource center is not available';	
}
fclose($handle);
?>