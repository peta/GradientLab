/**
 *
 * @author peter
 * 
 */

GLab.Sys.Classes.ColorGradient = GLab.Sys.Classes.Class.extend({
	
	/*
	 * Object components/fields
	 * 
	 */
	name:				"Untitled Preset",		// ColorGradients default name/title
	colorStops:			undefined,				// Array with color stop objects
	type:				undefined,				// Gradient type; linear or radial
	validTypes:			["linear", "radial"],	// Possible gradient types
	angle:				0,						// Angle used for linear gradient; default value
	iterator:			undefined,				// Used to iterate over cstops
		
	
	
	/**
	 * Creates a new GLab.Sys.Classes.ColorGradient instance.
	 * 
	 * @constructor
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ColorGradient
	 * @alias GLab.Sys.Classes.ColorGradient
	 * @param {String} name The ColorGradient's name/title
	 * @param {Array} cstops Array with ColorStop-instances
	 * @param {String} type Gradient-type ("linear" or "radial")
	 * @param {Number} angle ColorGradient's angle. (Only matters for linear gradients)
	 */
	init: function(name, cstops, type, angle) {

		if (   cstops !== undefined
			&& (   cstops instanceof GLab.Sys.Classes.ColorStop 
				|| (   cstops.constructor === Array 
					&& cstops.length
					&& cstops.every(function(e) {
						return e instanceof GLab.Sys.Classes.ColorStop;
					})))
			&& this.validTypes.indexOf(type) > -1) 
		{
			this.name = (name !== undefined) ? name.toString() : this.name;
			this.angle = (type == "linear" && !isNaN(parseInt(angle))) ? 
							parseInt(angle) : 
							this.angle;
			this.colorStops = ([]).concat(cstops);
			this.type = type;
			this.iterator = this.colorStops.length-1;
		}
		else {
			throw new TypeError("ColorGradient: Cannot create instance; invalid arguments received");
		}
	},
	
	
	
	/**
	 * Returns the ColorGradient's name
	 * 
	 * @method
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ColorGradient.getName
	 * @alias GLab.Sys.Classes.ColorGradient.getName
	 * @return {String}
	 */
	getName: function() {
		return this.name;
	},
	
	
	/**
	 * Sets the name of a GLab.Sys.Classes.ColorGradient instance
	 * 
	 * @method
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ColorGradient.setName
	 * @alias GLab.Sys.Classes.ColorGradient.setName
	 * @param {String} n The new name
	 */
	setName: function(n) {
		this.name = (n !== undefined) ? n.toString() : this.name;	
	},
	
	/**
	 * Returns the ColorGradient's angle. <i>(Only valid for linear gradients)</i>
	 * 
	 * @method
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ColorGradient.getAngle
	 * @alias GLab.Sys.Classes.ColorGradient.getAngle
	 * @return {Number} The angle in degrees
	 */
	getAngle: function() {
		return this.angle;
	},
	
	/**
	 * Returns the ColorGradient's gradient-type. <i>("linear" or "radial")</i>
	 * 
	 * @method
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ColorGradient.getType
	 * @alias GLab.Sys.Classes.ColorGradient.getType
	 * @return {String}
	 */
	getType: function() {
		return this.type;
	},
	
	/**
	 * Use this method to iterate through all ColorStops.
	 * 
	 * @method next
	 * @return {ColorStop} Yields every single GLab.Sys.Classes.ColorStop instance.
	 * @memberOf {ColorGradient} 
	 */
	next: function() {
		if (this.iterator == -1) {
			this.iterator = this.colorStops.length - 1;
			return undefined;
		}
		else if (this.iterator >= 0) {
			return this.colorStops[this.iterator--];
		}
		throw new Error("Foo");
	}
});



