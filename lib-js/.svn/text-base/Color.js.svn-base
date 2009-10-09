/**
 *
 * @author peter
 * 
 */

 
 GLab.Sys.Classes.Color = GLab.Sys.Classes.Class.extend({
 	
	r:				undefined,
	g: 				undefined,
	b:				undefined,
	title:			undefined,
	
	
	init: 		function(r,g,b,title) {
		if (   typeof r == "number"
			&& r >= 0 && r <= 255 
			&& typeof g == "number"
			&& g >= 0 && g <= 255 
			&& typeof b == "number"
			&& b >= 0 && b <= 255) 
		{
			this.r = r;
			this.g = g;
			this.b = b;
			this.title = title || "";	
		}
	},
	
	toRGBA: 	function(opacity) {
		if (   typeof opacity === "number"
			&& opacity >= 0 && opacity <= 1)
		{
			return "rgba(" 	+ this.r + ", " 
							+ this.g + ", " 
							+ this.b + ", " 
							+ opacity + ")";
		}
	},
	
	toRGB: 	function() {
		return "rgb(" 	+ this.r + ", " 
						+ this.g + ", " 
						+ this.b + ")";
	},
	
	getName: function() {
		return this.title;
	}
	
 });
