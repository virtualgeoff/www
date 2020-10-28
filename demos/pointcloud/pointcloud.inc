
	<p id="info"></p>
	<p id="info2"></p>
	<p id="camera">camera: 
		<a href="#" onclick="cameraMove=false; return setCamera(0,0,-10,0,0,0)">front</a> | 
		<a href="#" onclick="cameraMove=false; return setCamera(0,0,10,0,180,0)">back</a> | 
		<a href="#" onclick="cameraMove=false; return setCamera(-10,0,0,0,90,0)">left</a> | 
		<a href="#" onclick="cameraMove=false; return setCamera(10,0,0,0,-90,0)">right</a> | 
		<a href="#" onclick="cameraMove=false; return setCamera(0,10,0,90,0,0)">top</a> | 
		<a href="#" onclick="cameraMove=false; return setCamera(0,-10,0,-90,0,0)">bottom</a> | 
		<a href="#" onclick="cameraMove=true; return setCamera(0,0,10,0,0,0)">free</a>
	</p>
	<p id="dotstyle">style:
		<a href="#" onclick="return changeStyle('dot');">dot</a> | 
		<a href="#" onclick="return changeStyle('plus');">plus</a> | 
		<a href="#" onclick="return changeStyle('number');">number</a> |
		<a href="#" onclick="return changeStyle('pos');">position</a> 
	</p>
