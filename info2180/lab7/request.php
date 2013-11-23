<?php
// For PHP 5 and up
$term = (!empty($_REQUEST['term']))? $_REQUEST['term']: '';
$all = (!empty($_REQUEST['all']))? $_REQUEST['all'] : '';
$author = (!empty($_REQUEST['author']))? $_REQUEST['author']: '';
$source = "https://webster.cs.washington.edu/cse154/labs/ajax/urban.php?term=$term&all=$all&author=$author";
if(!file_exists($source)){
	$source = "alternative_source.php";
	if(!file_exists($source)){
		$source = false;	
	}
}
if($source != false){
	$handle = fopen($source, "rb");
	$contents = stream_get_contents($handle);
	print $contents;
	fclose($handle);
}else{
	echo 'resource center is not available';
}
?>