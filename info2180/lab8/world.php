<?php
require_once 'config.db.php';
if(!empty($_REQUEST['lookup']) || (!empty($_REQUEST['all']) && $_REQUEST['all'] == true)){
	$LOOKUP = (!empty($_REQUEST['lookup']))?$_REQUEST['lookup']:'';
    $doXML = (!empty($_REQUEST['format']) && $_REQUEST['format'] === 'xml')?true:false;
	# execute a SQL query on the database
	$results = mysql_query("SELECT * FROM countries WHERE name LIKE '%$LOOKUP%';");
	# loop through each country
    if(!$doXML){
        while ($row = mysql_fetch_array($results)) {
          ?>
          <li> <?php echo $row["name"]; ?>, ruled by <?php echo $row["head_of_state"]; ?> </li>
          <?php
        }
    }else{
        //Set the content-type header to xml
        header("Content-type: text/xml");
        $xml = new DomDocument('1.0', "UTF-8");
        $countries = $xml->createElement('countrydata');
        $countries = $xml->appendChild($countries);
        while ($row = mysql_fetch_array($results)) {
        $country = $xml->createElement('country');
        $country = $countries->appendChild($country);
        $name = $xml->createElement('name', $row["name"]);
        $ruler = $xml->createElement('ruler', $row["head_of_state"]);
        $name = $country->appendChild($name);
        $ruler = $country->appendChild($ruler);
        }
        $string_value = $xml->saveXML();
        echo $string_value;
    }
}else{
	echo "Not Found";
}
?>