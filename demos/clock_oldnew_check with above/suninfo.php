<!DOCTYPE html>

<html>
<head>
	<title>PHP Sun Info</title>
	<meta name="generator" content="BBEdit 11.5" />
</head>
<body>

	<h1>PHP Sun Info</h1>
	<p><a href="http://php.net/manual/en/function.date-sun-info.php">http://php.net/manual/en/function.date-sun-info.php</a></p>

<pre>
date_sun_info

(PHP 5 >= 5.1.2, PHP 7)
date_sun_info — Returns an array with information about sunset/sunrise and twilight begin/end
</pre>

<h2>Example</h2>
<p>Need to add current date and location:</p>

<p>Date: 2016-08-04<br>
Location: -33.8821373, 151.2010212 (ABC Building)</p>

<?php

$sun_info = date_sun_info(strtotime("2016-08-04"), -33.8821373, 151.2010212);
foreach ($sun_info as $key => $val) {
    echo "$key: " . date("H:i:s", $val) . "<br>";
}

?>

</body>
</html>
