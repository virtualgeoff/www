//normalizes all the members of an array
//by the member indicated by index parameter
function normalize(array, index)
{
	k = array[index];
	for (var i=0; i <array.length; i++)
		array[i] = array[i]/k;
	return array;
}


//rounds array elements
function roundArray(array)
{
	tmp = new Array(array.length);
	for (var i=0; i<array.length; i++)
		tmp[i] = Math.round(array[i]);
	return tmp;
}



function Matrix(matrix){
   if (matrix==null)
   {
		this.identity = new Array (
				new Array(1, 0, 0, 0),
				new Array(0, 1, 0, 0),
				new Array(0, 0, 1, 0),
				new Array(0, 0, 0, 1))
		this.matrix = this.identity;
   }
	else
		this.matrix = matrix;


	//returns a 4x4 array 
	this.getMatrix = function()
	{
		return this.matrix
	}


	this.setTranslation = function(translation){
		if (translation.length!=3)
			alert("expected array length: 3");
		else
		{
			this.matrix[0][3] = translation[0];
			this.matrix[1][3] = translation[1];
			this.matrix[2][3] = translation[2];
		}
	}

	//sets perspective viewpoint matrix
	this.setPerspective = function(distance)
	{		
		this.matrix[3][2] = 1/distance;
	}


	this.setScale = function(scale)
	{
		if (scale.length!=3)
			alert("expected array length: 3");
		else
		{
			this.matrix[0][0] = scale[0]
			this.matrix[1][1] = scale[1]
			this.matrix[2][2] = scale[2]
		}
	}


	//from axis angle rotation array sets rotation matrix
	this.setRotation = function(rotation)
	{
		if (rotation.length!=4)
            alert("expected array length: 4");
        else
		{
            var r0 = Math.cos(rotation[3])
            var r1 = Math.sin(rotation[3])
            var r2 = 1 - r0
            var r3 = rotation[0]
            var r4 = rotation[1]
            var r5 = rotation[2]
            this.matrix[0][0] = r2 * r3 * r3 + r0
            this.matrix[0][1] = r2 * r3 * r4 - r1 * r5
            this.matrix[0][2] = r2 * r3 * r5 + r1 * r4

            this.matrix[1][0] = r2 * r3 * r4 + r1 * r5
            this.matrix[1][1] = r2 * r4 * r4 + r0
            this.matrix[1][2] = r2 * r4 * r5 - r1 * r3

            this.matrix[2][0] = r2 * r3 * r5 - r1 * r4
            this.matrix[2][1] = r2 * r4 * r5 + r1 * r3
            this.matrix[2][2] = r2 * r5 * r5 + r0
		}
	}

	//Multiples this 4x4 order matrix to 1x4 matrix
	this.multiply1 = function(array)
	{        
        if (array.length!=4)
            alert("expected array length: 4");
        else
		{
            cols = this.matrix[0].length;
            c = new Array(0, 0, 0, 0);
            for (var i=0; i< this.matrix.length; i++)
	            for (var j=0; j< array.length; j++)
					c[i] += this.matrix[i][j]* array[j]
		}
        return c
	}

	//Multiples only 4x4 Matrix objects
	this.multiply4 = function(matrix)
	{
		//put an error handling code here
		var cols = this.matrix[0].length
		var c = new Array(new Array(0, 0, 0, 0),
					  new Array(0, 0, 0, 0),
					  new Array(0, 0, 0, 0),
					  new Array(0, 0, 0, 0));
		for (var i=0; i<4; i++)
			for (var j=0; j<4; j++)
				for (var k=0; k<4; k++)
					c[i][j] += this.matrix[i][k]* matrix.getMatrix()[k][j];
        return new Matrix(c)
	}


	this.toString = function()
	{
		for (var i=0; i <this.matrix.length; i++)
		{
			for (var j=0; j < this.matrix[i].length; j++)
					document.write(this.matrix[i][j] + ", ");
			document.write("<br>")
		}
	}
}