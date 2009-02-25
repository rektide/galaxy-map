/// fix svg ///
//
function writeSetter(o,prop) {
	o.__defineSetter__(
		prop,
		function(v){ this.setAttribute(prop,v); }) 
};
function writeSetters(o) {
	o = o.prototype;
	for(var i= 1; i < arguments.length - 1; i++)
		writeSetter(o,arguments[i]);
};

writeSetters(SVGCircleElement, "cx", "cy", "r", "fill", "style");
writeSetters(SVGSVGElement, "x", "y", "height", "width"); // does not appear to work


