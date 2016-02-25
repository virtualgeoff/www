
// Geoff Pack
// geoff@virtualgeoff.com
// October 2004

function addTime(input) {
	//window.status = input + ', ' + input.value + ', ' + input.form

	x = parseInt(input.value);
	input.value = x;
	
	if ((isNaN(x)) || (x < 0)) input.value = 0;
	else if (x > 100) input.value = 100;

	var subTotal = 	parseInt(input.form['1-1'].value) + 
					parseInt(input.form['1-2'].value) + 
					parseInt(input.form['1-3'].value) + 
					parseInt(input.form['1-4'].value) + 
					parseInt(input.form['1-5'].value) + 
					parseInt(input.form['1-6'].value) + 
					parseInt(input.form['1-7'].value) + 
					parseInt(input.form['1-8'].value) + 
					parseInt(input.form['1-9'].value) + 
					parseInt(input.form['1-10'].value);

	window.status = subTotal;

	if (subTotal > 100)	{
		input.value -= (subTotal-100);
		input.form['1-11'].value = 0;  // subTotal will be 100 if re-calculated, but no need
	} else {
		input.form['1-11'].value = 100 - subTotal;
	}
}

