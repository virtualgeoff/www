<!DOCTYPE html>

<html lang="en">
<head>
	<meta charset="utf-8">
	<title>SSI and PHP test</title>
</head>
<body>

<h1>Test</h1>

<!--#include virtual="/test/test2.html"-->

<?php

echo "<p>PHP working!</p>";

phpinfo();

?>


</body>
</html>
