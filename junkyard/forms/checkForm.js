
// Geoff Pack
// Spike, June 1998

function isEmail(checkString) {
    if (checkString.indexOf("@") == -1) return false;
    if (checkString.indexOf(".") == -1) return false;
    for (var i=0; i<checkString.length; i++) {
        ch = checkString.charAt(i)
        if (! ((ch >= "A" && ch <= "Z") 
        		|| (ch >= "a" && ch <= "z")
                || (ch == "@") || (ch == ".") || (ch == "_")
                || (ch == "-") || (ch >= "0" && ch <= "9")) ) 
            return false;
    }
    return true;
}
function isText(checkString) {
	for (var i=0; i<checkString.length; i++) {
        ch = checkString.charAt(i)
        if ((ch > "0" && "9" > ch))
            return false;
    }
    return true;
}
function isNumeric(checkString) {
	for (var i=0; i<checkString.length; i++) {
        ch = checkString.charAt(i)
        if ((ch < "0" || "9" < ch) && (ch != '.'))
            return false;
    }
    return true;
}
function checkEmail(input) {
	var ok = isEmail(input.value);
	if (!ok) {
		alert("Badly formatted email address.");
		//input.value = "";
		input.focus();
	}
}
function checkText(input) {
	var ok = isText(input.value);
	if (!ok) {
		alert("'" + input.name + "'  must contain text only.");
		//input.value = "";
		input.focus();
	}
}
function checkNumeric(input) {
	var str = input.value;
	var ok = isNumeric(input.value);
	if (!ok) {
		alert("'" + input.name + "'  must contain a numerical value.");
		//input.value = "";
		input.focus();
	}
}
function checkRequiredFields(input) {
    var requiredFields = new Array("Name","Email");
    var fieldNames = new Array("Name","Email");
    var fieldCheck   = true;
    var fieldsNeeded = "\nThe following information is required:\n\n\t";

    for (var fieldNum=0; fieldNum<requiredFields.length; fieldNum++) {
        if ((input.elements[requiredFields[fieldNum]].value == "") ||
            (input.elements[requiredFields[fieldNum]].value == " ")) {
            	fieldsNeeded += fieldNames[fieldNum] + "\n\t";
            	fieldCheck = false;
        }
    }
    if (fieldCheck==true) return true;
    else {
        alert(fieldsNeeded);
        return false;
    }
}


