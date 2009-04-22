/// fix svg ///
//
function writeSetter(o,prop) {
	o.__defineSetter__(
		prop,
		function(v){ this.setAttribute(prop,v); }) 
};
function writeSetters(o) {
	o = o.prototype;
	for(var i= 1; i < arguments.length; i++)
		writeSetter(o,arguments[i]);
};

writeSetters(SVGCircleElement, "cx", "cy", "r", "fill", "style");
writeSetters(SVGSVGElement, "x", "y", "height", "width"); // does not appear to work


// build an object that contains a lot of dom children
function buildDocumentRepresentation(target)
{
	var t = window[target] = new Object();
	var i = 1;
	for(var i= 1; i < arguments.length; i++)
		t[arguments[i]] = document.getElementById(arguments[i]);
	return t;
}


// define console if its not there
if(!window.console) window.console = {log:function(){}};
