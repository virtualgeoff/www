//A JavaScript library to construct primitive wireframe shapes.
//author -- Vilius Jagminas
//version 0.1
//date 2003.10.15
//Copyright 2003, Vilius Jagminas, vjagminas@hotmail.com


//Point object constructor
function Point(coord)
{
	var _coord = new Array(0, 0, 0);
	if (coord!=null)
		_coord = coord;
	_coord[3] = 1;

	//Prints coordinates of this point
	this.toString = function()
	{
		for (var i = 0; i < _coord.length; i++ )
		{
			s = i != (_coord.length - 1) ? ", " : "<br>";
			document.write(_coord[i] + s);
		}
	}

	//Transforms this point by a matrix
	this.transform = function(matrix)
	{
		var c1 = this.getCoord(2);
		var m1 = matrix.multiply1(c1);	
		m1 = roundArray(m1);
		var p1 = new Point(m1);
		return p1;
	}

	//Gets coordinates of this point. 
	//format = null | 0 | anything else than 1, 2 -- return "x, y, z, 1" string
	//format = 1 -- return [x, y, z] array
	//format = 2 -- return [x, y, z, 1] array
	this.getCoord = function(format)
	{
		switch(format)
		{
			case 1: 
			{ 
				var tmp = new Array();
				for (var i = 0; i < _coord.length - 1; i++ )
					tmp[i] = _coord[i];
				return tmp; 
			}
			break;

			case 2:
			{
				var tmp = new Array();
				for (var i = 0; i < _coord.length; i++ )
					tmp[i] = _coord[i];
				return tmp; 
			}
			break;
			
			default:{ this.toString(); }
			break;
		}				
	}
	

	//Sets affine point coordinates: [x, y, z, 1]
	this.setCoord = function(coord)
	{
		if(coord.length != 4 && coord[3] != 1)
			alert('required array: [x, y, z, 1]');
		else
			_coord = coord;
	}
}

//Line object constructor
function Line(point1, point2)
{
	var _point1 = point1;
	var _point2 = point2;
	
	//Returns a new transformed copy of this line.
	this.transform = function(matrix)
	{		
		var p1 = _point1.transform(matrix);
		var p2 = _point2.transform(matrix);
		var line = new Line(p1, p2);		
		return line;
	}

	//Prints  start and endpoints of this line 	
	this.toString = function()
	{
		document.write('_point1 = ');
		_point1.toString();
		document.write('_point2 = ');
		_point2.toString();
	}

	
	//returns start and endpoints of this line
	//
	this.getPoints = function()
	{
		return new Array(_point1, _point2);
	}
}

//A coordinate system x, y, z axes constructor
function CoordSystem(size, edges)
{	
	this.edges = new Array(3);
	this.makeEdges = function(size)
	{		
		var p1 = new Point(new Array(-1*size/2, 0, 0));
		var p2 = new Point(new Array(size/2, 0, 0));
		var l = new Line(p1, p2);
		this.edges[0] = l;
		p1 = new Point(new Array(0, -1*size/2, 0));
		p2 = new Point(new Array(0, size/2, 0));
		l = new Line(p1, p2);
		this.edges[1] = l;
		p1 = new Point(new Array(0, 0, -1*size/2));
		p2 = new Point(new Array(0, 0, size/2));
		l = new Line(p1, p2);
		this.edges[2] = l;
		return this.edges;
	}
	
	
	//Returns x, y, z axes as an array of Line instances.
	this.getEdges = function()
	{
		return this.edges;
	}


	//Transforms this coordinate system by a given matrix.
	this.transform = function(matrix)
	{
		var tmp = new Array();
		var tmp = new Array();
		for (var i=0; i< this.edges.length; i++)
			tmp[i] = this.edges[i].transform(matrix);	
		return new CoordSystem(null, tmp);
	}

	//Prints coordinates of x, y, z axes lines to the browser window.
	this.toString = function()
	{
		for (var i=0; i<this.edges.length; i++ )
		{
			document.write('<br>edge[' + i + ']= <br>');
			this.edges[i].toString();
		}
	}	
	
	
	if (edges == null)
	{
		this.edges = this.makeEdges(size);
	}
	else
	{
		for (i = 0; i < edges.length; i++)
			this.edges[i] = edges[i];		
	}
}


//Cube constructor
function Cube(size, edges)
{	
	this.edges = new Array(12);
	this.makeEdges = function(size)
	{
		//basic transformation for the horizontal bottom front edge
		var transf = new Array();
		var bottom = new Matrix();
		bottom.setTranslation(new Array(0, size/2, size/2));
		transf.push(bottom);

		//basic transformation for the horizontal top front edge
		var top = new Matrix();
		top.setTranslation(new Array(0, -size/2, size/2));
		transf.push(top);

		//basic transformation for the vertical front left edge
		var r = new Matrix();
		r.setRotation(new Array(0, 0, 1, 1.57));
		var t = new Matrix();
		t.setTranslation(new Array(-1*size/2, 0, size/2));
		var side = t.multiply4(r);
		transf.push(side);


		//rotates an edges to form four sides of the cube
		var indx = 0;
		for (var j=0; j<transf.length; j++ )
		{	
			for (var i = 0; i<6.24; i+=1.57)
			{
				var r = new Matrix();
				r.setRotation(new Array(0, 1, 0, i));
				var pr = r.multiply4(transf[j]);
				var p1 = new Point(new Array(-1*size/2, 0, 0));
				var p2 = new Point(new Array(size/2, 0, 0));
				var edge = new Line(p1, p2);
				var edge1 = edge.transform(pr);
				this.edges[indx++] = edge1;				
			}
		}
	}

	if (size != null)
		this.makeEdges(size);
	else
	{
		for (i = 0; i < edges.length; i++)
			this.edges[i] = edges[i];		
	}

		

	//Returns an array of all edges that make this cube.
	this.getEdges = function()
	{
		return this.edges;
	}


	//Transforms this cube by a given matrix.
	//This is a buggy implementation. It appears that 
	//after a transformation the whole Cube object gets screwd up.
	//After sitting for two whole days with this problem I finally gave up.
	this.transform = function(matrix)
	{
		var tmp = new Array();
		for (var i=0; i< this.edges.length; i++)
			tmp[i] = this.edges[i].transform(matrix);
		return new Cube(null, tmp);		
	}



	//Prints the coordinates of all the Cube edges to the browser window.
	this.toString = function()
	{
		document.write('Object: <br>');
		for (i in this)
			document.write('i = ' + i + '<br>');
		
		for (var i=0; i<this.edges.length; i++ )
		{
			document.write('<br>edge[' + i + ']= <br>');
			this.edges[i].toString();
		}
		document.write('end of object<br><br>');
	}	
}
