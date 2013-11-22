	<?php
	// For PHP 5 and up
	if(!empty($_POST['url'])){
	$handle = fopen($_POST['url'], "rb");
	$contents = stream_get_contents($handle);
	print $contents;
	fclose($handle);
	}
	?>