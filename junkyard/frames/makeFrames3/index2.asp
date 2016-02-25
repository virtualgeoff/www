<%@ Language=VBScript %>
<%Option Explicit %>
<html>
<head>
<title>Javascript Junkyard - Writing Framesets 3</title>
<link rel="stylesheet" type="text/css" href="../../junkyard.css">
</head>

<frameset border="1" rows="80,*,80">
	<frame name="header" src="header<%=Request("section")%>.html" marginwidth="15" marginheight="15">
	<frame name="content" src="content<%=Request("section")%>.html" marginwidth="15" marginheight="15">
	<frame name="footer" src="footer<%=Request("section")%>.html" marginwidth="15" marginheight="15">
</frameset>

// -->
</script>

</html>
