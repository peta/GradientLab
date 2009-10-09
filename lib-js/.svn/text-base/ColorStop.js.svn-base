/**
 *
 * @author peter
 * 
 */

/**
 * A GLab.Sys.Classes.ColorStop object ties together a GLab.Sys.Classes.Color object with
 * a offset position.
 * 
 * @constructor
 * @alias GLab.Sys.Classes.ColorStop
 * @param {Number} o with a decimal <b>offset value (0.0 - 1.0)</b>
 * @param {Color} c <b>Color</b> object that will be tied together
 */
GLab.Sys.Classes.ColorStop = GLab.Sys.Classes.Class.extend({
	
	/*
	 * Object components/fields
	 * 
	 */
	offset:			undefined,	// Offset as percental value (>= 0 && <= 1)
	color:			undefined,	// GLab.Sys.Classes.Color object
	
	
	init: function(o, c) {
		if (   c instanceof GLab.Sys.Classes.Color 
			&& (	typeof o == "number" 
				&&	o >= 0
				&&	o <= 1)) 
		{
			this.offset = o;
			this.color = c;
		}
	},
	
	
	/**
	 * Get <b>percental position</b> of my color. 
	 * 
	 * @method
	 * @alias GLab.Sys.Classes.ColorStop.getOffset
	 * @return {Number}  Position as decimal value
	 */
	getOffset: function() {
		return this.offset;
	},
	
	
	/**
	 * Get my color value as object of type <b>Color</b>
	 * 
	 * @method
	 * @alias GLab.Sys.Classes.ColorStop.getColor
	 * @return {Color}
	 */	
	getColor: function() {
		return this.color;
	}
	
});
