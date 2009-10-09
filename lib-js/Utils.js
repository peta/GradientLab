/**
 *
 * @author peter
 * 
 */

/**
 * Contains miscellaneous static functions utilized
 * by other components.
 * 
 * @alias GLab.Utils
 */
GLab.Utils = {};

/**
 * Calculates the height to a given width so that their 
 * hypotenuse will an angle that equals to the specified one.
 * 
 * @alias GLab.Utils.calcFillRectFromAngle
 * @param {Number} angle Angle for the hypotenuse
 * @param {Number} a Side length to use as height
 * @param {Number} b Side length to use as width
 */
GLab.Utils.calcFillRectFromAngle = function(angle, a, b) {
	angle = Math.abs(angle);
	// prevent full rotation, change needle position instead
	angle = (angle > 180) ? angle-180 : angle;
	if (angle == 90 || angle == 180){
		return {
			x: 0,
			y: a
		};
	}
	else if (angle >= 0) {
		return {
			x: b,
			y: Math.tan(2 * Math.PI * (angle/360)) * b
		};
	}
};


/**
 * Calculates the angle of a hypotenuse of two specified
 * side lengths -- height and width.
 *
 * @alias GLab.Utils.calcAngleFromFillRect
 * @param {Number} a Side length to use as height
 * @param {Number} b Side length to use as width
 */
GLab.Utils.calcAngleFromFillRect = function(a, b) {
	return Math.atan(a * b) * (360 / (2* Math.PI));
};


/**
 * Mathematically calculates the angle based on a given height.
 * 
 * @alias GLab.Utils.generateJsCode
 * @param {String} id Canvas-element's ID
 * @param {ColorGradient} cg An instance of GLab.Sys.Classes.ColorGradient
 * @param {Number} a Side length to use as height
 * @param {Number} b Side length to use as width
 * @retun {String} Generated JavaScript code
 */
GLab.Utils.generateJsCode = function(id, cg, a, b) {
	var jsCode = "",
		type,				// temp variable
		endPoint,			// temp variable
		csPointer;			// temp variable
		
	jsCode += 
		"// BEGIN\n" +
		"var cv = document.getElementById(\"" + id + "\");\n" +
		"var ctx = cv.getContext(\"2d\");\n";
	
	type = cg.getType(); 
	if (type == "linear") {
		endPoint = this.calcFillRectFromAngle(cg.getAngle(), a, b);
		jsCode += 
			"var cg = ctx.createLinearGradient(0, 0, " + 
				endPoint.x + ", " + 
				endPoint.y + ");\n";
	}
	else if (type  == "radial") {
		jsCode += 
			"var cg = ctx.createRadialGradient(" + 
				b / 2	+ ", " + 
				a / 2	+ ", " + 
				b / 2	+ ", " + 
				b / 2	+ ", " + 
				a / 2	+ ", " + 
				0		+ ");\n";
	}
	
	while (csPointer = cg.next()) {
		jsCode += 
			"cg.addColorStop(" +
				csPointer.getOffset() + ", \"" + 
				csPointer.getColor().toRGB() + "\");\n";
	}
	
	jsCode += "ctx.fillStyle = cg;\n";
	jsCode += "ctx.fillRect(0, 0, " + b + ", " + a + ");\n";
	jsCode += "// END\n";
	
	return jsCode;	
};

GLab.Utils.showExportDialog = function() {
	
};
