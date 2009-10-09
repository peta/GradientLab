/**
 *
 * @author peter
 * 
 */

 
 GLab.Sys.Classes.CanvasWrapper = GLab.Sys.Classes.Class.extend({
 	
	
	/*
	 * Object components/fields
	 * 
	 */
	id:						undefined,
	cvInstance: 			undefined,	// holds a reference to the assigned CanvasElement
	cvContext: 				undefined,	// holds a reference to assigned CanvasElement's 2d context object
	lastFillStyle: 			undefined,	// use as "backup" for the previous fillStyle, when he gets changed
	initState:				undefined,  // holds a copy of the GradientCanvas (without colorstops)
	currCvGradient: 		undefined,	// holds a reference to the currently used CanvasGradient
	
	defaultGradientAngle:	0,			// default angle for the linear gradient
	cvWidth:				undefined,	// canvas width
	cvHeight:				undefined,	// canvas height
	defaultRadFrom:			undefined,	// default inner radius for radial gradients
	defaultRadTo:			0,			// default outer radius for radial gradients
	
	
	
	/*
	 * Contructor
	 * 
	 */
	init: function(cvInst) {
		if (!!cvInst && cvInst.constructor === HTMLCanvasElement) {
			this.cvInstance = cvInst;
			this.id = this.cvInstance.id;
			this.cvContext = this.cvInstance.getContext("2d");
			this.lastFillStyle = this.cvContext.fillStyle;
			this.cvWidth = this.cvInstance.clientWidth;
			this.cvHeight = this.cvInstance.clientHeight;
			this.defaultRadFrom = this.cvWidth / 2;
			
			//console.log("New CanvasFace object instantiated");
		}
		else {
			console.error(cvInst);
			throw new TypeError("HTMLCanvasElement expected, incompatible object received");
		}
	},
	
	
	
	/*
	 * Methods 
	 * 
	 */
	
	/**
	 * Returns a CanvasGradient object when valid parameters
	 * were passed in.
	 * 
	 * @private
	 * @param {Object} params N/A
	 * @return {CanvasGradient} 
	 */
	_createCanvasGradient: function(type, params) {
		
		var cvc = this.cvContext;	// temp reference to CanvasElement's 2d context
		
		if (!!type && type == "linear") {
			// once as backup
			/*this._saveGradient(cvc.createLinearGradient(params.x1,
											params.y1,
											params.x2,
											params.y2));*/
			// and once for use
			return cvc.createLinearGradient(params.x1,
											params.y1,
											params.x2,
											params.y2);
		}
		else if (!!type && type == "radial") {
			// once as backup
			/*this._saveGradient(cvc.createRadialGradient(params.x1,
											params.y1,
											params.r1,
											params.x2,
											params.y2,
											params.r2));*/
			// and once for use
			return cvc.createRadialGradient(params.x1,
											params.y1,
											params.r1,
											params.x2,
											params.y2,
											params.r2);
		}

		throw new TypeError("Cannot create CanvasGradient; invalid parameters");
	},
	
	/**
	 * Use only this method when you want to change the current
	 * CanvasGradient used as default fill style.
	 * 
	 * @param {Object} params
	 */
	changeGradientTo: function(type, args) {
		
		var cvc = 		this.cvContext,
			lfs = 		this.lastFillStyle,
			params = 	{},
			checkedAngle;								
		
		if (!!type && typeof type == "string") {
			// 
			if (type == "linear") {
				
				//console.log(args);
				
				// checking if custom angle was supplied
				checkedAngle = (args !== undefined && args.angle !== undefined && typeof args.angle == "number") 
							? (args.angle) : (this.defaultGradientAngle);

				var c = this._calcCoordsFromAngle(checkedAngle);
				//console.info(c);			
				params.x1 = 0; 
				params.y1 = 0;
				params.x2 = c.x;
				params.y2 = c.y;
				
			}
			else if (type == "radial") {
				params.x1 = params.x2 = this.cvWidth / 2; 
				params.y1 = params.y2  = this.cvHeight / 2;
				
				params.r1 = (args !== undefined && !!args.r1 && typeof args.r1 == "number")
					? (args.r1) : (this.defaultRadFrom);
				params.r2 = (args !== undefined && !!args.r2 && typeof args.r2 == "number")
					? (args.r2)	: (this.defaultRadTo);						
			}
			else {
				throw new TypeError("Cannot change gradient; invalid gradient type supplied");
			}
			
			// when initial setup initial state for later restore 
			if (!!args && args.initial == true) {
				//console.info("setting initial state");
				this.initState = { 
					type: type,
					params: args
				};
				//console.log("Saved current Gradient-state");		
			}
			
			try {							
				//lfs = cvc.fillStyle;
				cvc.fillStyle = this.currCvGradient = this._createCanvasGradient(type, params);
				//console.log("Changed fillStyle to new CanvasGradient");
			}
			catch (e) {
				console.error(e);
				throw new TypeError("Cannot change gradient; invalid parameters");
			}
		}
	},
	
	/**
	 * Inserts a new color spot to the gradient.
	 * 
	 * @param {Number} where Percental offset position.
	 * @param {String} color CSS-compatible color value (hex,rgb,rgba,colorname)
	 */
	addColor: function(cs) {
		
		var ccg = this.cvContext.fillStyle;
							
		if (   cs instanceof GLab.Sys.Classes.ColorStop
			&& !!ccg
			&& ccg.constructor === CanvasGradient)
		{
			//console.log("GLab.Sys.Classes.CanvasWrapper #" + this.id + ": adding colorstop ... " + where + " -- " + c);
			ccg.addColorStop(cs.offset, cs.color.toRGB());
			this.update();
			return this;
		}
		console.error(ccg.cons);					
		console.error(where);					
		console.error(c);					
		throw new TypeError("Cannot add color stop; invalid parameters");
	},
	
	
	/**
	 * Just refreshes the Canvas' display.
	 * 
	 */
	update: function() {
		//console.log("GLab.Sys.Classes.CanvasWrapper updating...");
		this.cvContext.fillRect(0, 0, this.cvWidth, this.cvHeight);
	},
	
	updateBounds: function() {
		this.cvWidth = this.cvInstance.clientWidth;
		this.cvHeight = this.cvInstance.clientHeight;
		this.defaultRadFrom = (this.cvWidth < this.cvHeight) ? 
								this.cvWidth / 2 :
								this.cvHeight / 2;
		this.update();
	},
	
	
	/**
	 * Saves the current Canvas-state.
	 * 
	 */
	_saveGradient: function(gcv) {
		this.cvGradientBackup = gcv;
	},
	
	/**
	 * Restores Canvas-state the state saved before.
	 * 
	 */
	restore: function() {
		if (this.initState !== undefined) {
			this.changeGradientTo(this.initState.type, this.initState.params);
		}
		else {
			console.error("GLab.Sys.Classes.CanvasWrapper.restore(): Cannot restore Canvas, there's no saved state");
		}
	},
	
	getId: function() {
		return this.id;
	},
	
	/**
	 * Mathematically calculates concrete height from a given angle.
	 * 
	 * @param {Number} angle Height will be calculated based on this value
	 * @private
	 */
	_calcCoordsFromAngle: function(angle) {
		angle = Math.abs(angle);
		// prevent full rotation, change needle position instead
		angle = (angle > 180) ? angle-180 : angle;
		if (angle == 90 || angle == 180){
			return {
				x: 0,
				y: this.cvHeight
			};
		}
		else if (angle >= 0) {
			return {
				x: this.cvWidth,
				y: Math.tan(2 * Math.PI * (angle/360)) * this.cvWidth
			};
		}
	},
	
	
	/**
	 * Mathematically calculates the angle based on a given height.
	 * 
	 * @param {Number} Angle will be calculated based on this value
	 * @private
	 */
	_calcAngleFromHeight: function(height) {
		return Math.atan(this.cvHeight * this.cvWidth) * (360 / (2* Math.PI));
	}
					
	
});/**
 * @author Peter Geil
 * @classDescription Just a custom implementation of pseudo-inheritance.
 */
(function() {
    var initializing = false, fnTest = /xyz/.test(function() {
        xyz;
    }) ? /\b_super\b/ : /.*/;
    var Class = function() {
    };
    Class.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
                return function() {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }
        function Class() {
            if (!initializing && this.init) this.init.apply(this, arguments);
        }
        
        Class.prototype = prototype;
        Class.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
    
    GLab.Sys.Classes.Class = Class;
})();
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



/**
 *
 * @author peter
 * 
 */

 GLab.Sys.Classes.ColorSlider = GLab.Sys.Classes.Class.extend({
 	
	
	/*
	 * Object components/fields
	 * 
	 */
	
	cvFacade:					undefined,
	needles:					{},
	needleCounter:				0,
	sliderElem:					$("div#slider").get(0),
	defaultSpawnPos:			0.5,	// default position where newly created needles are positioned
	defaultColor:				new GLab.Sys.Classes.Color(0,0,0,"000000"),
	addNeedleObserver:			undefined,
	removeNeedleObserver:		undefined,
	exportCodeObserver:			undefined,
	
	
	
	/*
	 * Constructor
	 * 
	 */
	
	init: function(params) {
		try {
			if (   params.gradientCanvasFacade instanceof GLab.Sys.Classes.GradientCanvasFacade
				&& params.sliderContainer instanceof HTMLElement)
			{
				this.cvFacade = params.gradientCanvasFacade;
				this.sliderElem = params.sliderContainer;
				
				this.addNeedleObserver = (typeof params.onAddNeedle == "function")
											? params.onAddNeedle
											: undefined;						
				this.removeNeedleObserver = (typeof params.onRemoveNeedle == "function")
												? params.onRemoveNeedle
												: undefined;						
				this.exportCodeObserver = (typeof params.onExportJS == "function")
												? params.onExportJS
												: undefined;						
			}
			else {
				
				console.error(params);
				throw new TypeError("Cannot create ColorSlider; expected objects" 
				+ " of type GradientColorFacade & HTMLElement, received invalid ones");
			}
			
		}
		catch(e) {
			console.error(e);
		}
	},
	
	
	
	/*
	 * Methods
	 * 
	 */
	
	/**
	 * Adds a new slider-needle to the color gradient.
	 * 
	 * @method
	 * @alias GLab.Sys.Classes.ColorSlider.addNeedle
	 * @param {ColorStop} cs The GLab.Sys.Classes.ColorStop being reflect by the newly crearted slider-needle
	 */
	addNeedle: function(cs) {
		
		var _this = this, // scope hook
			color = (cs instanceof GLab.Sys.Classes.ColorStop) ? cs.getColor() : this.defaultColor,
			pos = (cs instanceof GLab.Sys.Classes.ColorStop) ? cs.getOffset() : this.defaultSpawnPos;
						
		var needle = new GLab.Sys.Classes.SliderNeedleWrapper({
			defaultColor: color,
			onNeedleMove: function(needleId, pos) {
				_this._updateCanvas();
			},
			onRemoveNeedle: function(needleId) {
				_this._removeNeedle(needleId);
			},
			onColorChange: function(needleId, ewColor) {
				_this._updateCanvas();
			}
		});
		
		// adding to DOM
		needle.appendTo(this.sliderElem);
		// adding to internal needle-list
		this.needles[needle.getId()] = needle;
		// moving to its inital position	
		this._moveNeedleTo(needle, pos);
		this.needleCounter++;
				
		// notifying observers (currently only a single one)
		if (!!this.addNeedleObserver) {
			this.addNeedleObserver(this.needleCounter);
		}
	},
		
	
	_removeNeedle: function(needleId) {
		this.needles[needleId].remove();
		delete this.needles[needleId];
		this._updateCanvas();
		
		this.needleCounter--;
		if (!!this.removeNeedleObserver) {
			this.removeNeedleObserver(this.needleCounter);
		}
	},
	
	
	_moveNeedleTo: function(needle, pos) {
		if (pos !== undefined && typeof pos == "number") {
			if (pos >= 0 && pos <= 1) {
				pos = this._translatePositionTo("absolute", pos);
			}
			else if (pos > $(this.sliderElem).innerHeight()) {
				
				pos = $(this.sliderElem).Height();
			}
			
			// asserting that the needle will alwasy remain within the
			// parent element's clientBoundary
			//pos -= 
			needle.moveTo(pos);
			this._updateCanvas();
		}
	},
	
	_updateCanvas: function() {
		//console.info("_updateCanvas called...");
		var colorStops = [],
			_this = this;
		for each (var needle in this.needles) {
			colorStops.push(new GLab.Sys.Classes.ColorStop(
				_this._translatePositionTo("percental", needle.getPosition()),
				needle.getColor()
			));
		};
		
		this.cvFacade.addColors(colorStops);
	},
	
	
	_translatePositionTo: function(unit, position) {
		var translatedVal = 0,
			maximum = $(this.sliderElem).height();
		//console.log(arguments);
		if (   !!position && typeof position == "number"
			&& !!unit && typeof unit == "string") 
		{
			
			if (unit == "absolute") {
				// asserting that translated value will be <= maxiumum
				position = (position > 1) ? 1 : position;
				maximum -= (position == 0.5) ? 0 : 14;
				translatedVal = Math.round(maximum * position);
				
				// subtracting the height of a needle element
				// TODO: Make that heights of the needle element are implicitly subtracted on the sliderElem' sheight
				
 			}
			else if (unit == "percental") {
				// needles can only be positioned inside its parent element 
				// => have to subtract by a needles height to keep correct ratio
				// TODO: Remove hardcoded position translation (roll calculation out to lower logic) 			
				maximum -= (position == maximum * 0.5) ? 0 : 14;
				// rounding down to 3 decimal places (hack)
				var rv = Math.round( (position / maximum) * 10000) / 10000;
				// for the case of an irrational position
				translatedVal = (rv > 1) ? 1 : rv; 
			}
		}					
		//console.log(translatedVal);
		return translatedVal;
	},
	
	applyColorGradient: function(cg) {
        
		if (!(cg instanceof GLab.Sys.Classes.ColorGradient)) {
			throw new TypeError("GradienCanvasFacade: Cannot apply" + 
				"ColorGradient; invalid object passed");
		}
		
		var type,
			n;
		
		// flushing existing needles
		for (n in this.needles) {
			this.needles[n].remove();
			delete this.needles[n];
		}
		this.needleCounter = 0;
		
		// adding new needles
		var cs;
		while (cs = cg.next()) {
			this.addNeedle(cs);
		}
		
		// setting gradient-type
		type = cg.getType();
		this.cvFacade.setGradientType(type);
		
		if (type == "linear") {
			this.cvFacade.setAngle(cg.getAngle());
		}
		
		
	}
	
});/**
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
/**
 *
 * @author peter
 * 
 */


 GLab.Sys.Classes.GradientCanvasFacade = GLab.Sys.Classes.Class.extend({
	/*
	 * Object components/fields
	 * 
	 */
	previewCanvas:			[],
	controllerCanvas:		[],
	currColorStops:			undefined,		// everytime colorstops are added, they'll be charged into this array
	lastGradientType:		"linear",		// Default value is "linear"
	lastAngle:				undefined,

	
	_registerWrappedCv: function(cvw, as) {
		if (cvw instanceof GLab.Sys.Classes.CanvasWrapper) {
			// setting initial gradient-type
			if (as !== undefined && as == "controller") { 
				cvw.changeGradientTo("linear", { 
					// canvas-elements utilized by sliders will always
					// have a gradient-angle parallel to the longest side
					angle: ((cvw.cvHeight >= cvw.cvWidth) ? 90 : 0), 
					initial: true 
				});
				this.controllerCanvas.push(cvw);
			}
			else {
				// canvas-elements used to preview a gradient design
				// have a arbitrarily chosed angle of 0°
				cvw.changeGradientTo("linear", { 
					angle: 0, 
					initial: true 
				});
				this.previewCanvas.push(cvw);			
			}
			
			//console.log("GradienCanvasFacade: GLab.Sys.Classes.CanvasWrapper \"" + cvw.getId() + "\" successfully registered");
		}
		else {
			throw new TypeError("Cannot register GLab.Sys.Classes.CanvasWrapper; received invalid object, must be type of GLab.Sys.Classes.CanvasWrapper");
		}
	},
	
	registerAsPreview: function(cvw) {
		this._registerWrappedCv(cvw, "preview");
	},
	
	registerAsController: function(cvw) {
		this._registerWrappedCv(cvw, "controller");
	},
	
	addColors: function(colorStops) {
		if (	colorStops.constructor === Array 
			&&	colorStops.length
			&&	colorStops.every(function(c) {
				return c instanceof GLab.Sys.Classes.ColorStop		
			})) 
		{
			// buffering last set colorstops
			this.currColorStops = colorStops;
			
			// updating Preview Canvasses
			this.previewCanvas.forEach(function(cvw) {
				if (this.currColorStops === undefined) {
					cvw.restore();
				}
				colorStops.forEach(function(cs) {
					cvw.addColor(cs);
				});
			});
			
			// updating Controller Canvasses
			this.controllerCanvas.forEach(function(cvw) {
				if (this.currColorStops === undefined) {
					cvw.restore();
				}
				colorStops.forEach(function(cs) {
					cvw.addColor(cs);
				});
			});
		}
		else {
			throw new TypeError("GradientCanvasFacade: cannot add Colors; " +
				"invalid arguments received");
		}
	},
	
	setAngle: function(deg) {
		//console.info("GradientCanvasFacade: setAngle called with \"" + deg + "\"");
		if (   this.lastGradientType !== undefined
			&& this.lastGradientType == "linear"
			&& this.currColorStops !== undefined
			&& typeof parseInt(deg) == "number"
			&& (deg >= 0 && deg <= 360)) 
		{
			
			var lgt = this.lastGradientType;
			this.lastAngle = deg;
			this.previewCanvas.forEach(function(cvw) {
				// OUCH! Didn't notice, that the following "this"
				// referes to the global object (window). Fck!
				cvw.changeGradientTo(lgt, { 
					initial: true,
					angle: parseInt(deg) 
				});
			});
			
			this.addColors(this.currColorStops);
		}
	},
	
	setGradientType: function(type) {
		type = type.toLowerCase();
		if (   typeof type == "string"
			&& ["linear", "radial"].indexOf(type) > -1 ) 
		{
			this.lastGradientType = type;
			this.previewCanvas.forEach(function(cvw) {
				cvw.changeGradientTo(type, { initial: true });
			});
			
			this.addColors(this.currColorStops);
			
		}		
	},
	
	update: function() {
		var _this = this;
		this.previewCanvas.forEach(function(cvw) {
			// OUCH! Didn't notice, that the following "this"
			// referes to the global object (window). Fck!
			cvw.updateBounds();
			_this.addColors(_this.currColorStops);
		});
	},
	
	
	/**
	 * Exports the GCFacade's current state as ColorGradient-object.
	 * 
	 *  @alias GLab.Sys.Classes.GLab.Sys.Classes.GradientCanvasFacade.exportAsColorGradient
	 *  @return {ColorGradient}
	 */
	exportAsColorGradient: function() {
		var lgt = this.lastGradientType,
			ccs = this.currColorStops;
		
		return new GLab.Sys.Classes.ColorGradient(	$.capitalizeStr(lgt) + ", " + ccs.length + " Colors", 
									this.currColorStops, 
									this.lastGradientType,
									this.lastAngle );
	}
});/**
 *
 * @author peter
 * 
 */

GLab = GLab || {};
GLab.Sys = GLab.Sys || {};
GLab.Sys.Classes = GLab.Sys.Classes || {};


GLab.Sys.Classes.ListWrapper = GLab.Sys.Classes.Class.extend({
	
	$DEFAULT_ITEM_TEMPLATE:			$("<li></li>"),	// default element-type used as child	
	DEFAULT_ITEM_CLASS:				"ListWrapperItem",
	DEFAULT_SELECTED_ITEM_CLASS:	"itemSelected",
	ITEM_ID_PREFIX:					"lwItem-",
	
	$container:						undefined,		// jQuery DOM element that holds all items
	$itemTemplate:					undefined,		// jQeury DOM element used as template		
	
	/**
	 * 
	 * @property
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ListWrapper.selectedIndex
	 * @memberOf {GLab.Sys.Classes.GLab.Sys.Classes.ListWrapper.selectedIndex}
	 */
	selectedIndex:					-1,
	numOfItems:						0,
	observerCbs:					[],
	
	/**
	 * Low-level class to construct a List-control with typical properties
	 * using arbitrary HTMLElements.
	 * 
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ListWrapper
	 * @constructor
	 * @param {HTMLElement} container Will be used as containment for items.
	 * @param {HTMLElement} childTemplate Each List-item will be of this type.
	 */
	init: function(container, childTemplate) {
		
		if (!(container instanceof HTMLElement)) {
			throw new TypeError("ListWrapper: Cannot create instance;" +
				"invalid container-argument passed");
		}
		
		childTemplate = childTemplate || this.$DEFAULT_ITEM_TEMPLATE;
		
		this.$container = $(container);
		this.$itemTemplate = $(childTemplate).clone() || $DEFAULT_ITEM_TEMPLATE;	
		this.$itemTemplate.addClass(this.DEFAULT_ITEM_CLASS);		
	},
	
	
	/**
	 * 
	 * @method
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ListWrapper.addItem
	 * @param {String} caption The item's user-visible caption.
	 * @return {Number} Index of the newly added item
	 */
	addItem: function(caption, args) {
		var _this = this,
			currIndex,
			id,
			newItem
			itemSelectCb = (!!args && typeof args.onSelect == "function") ?
								args.onSelect :
								undefined;
		
		currIndex = this.numOfItems;
		id = this.ITEM_ID_PREFIX + currIndex;
		
		newItem = this.$itemTemplate
			.clone()
			.text(caption)
			.attr("id", id)
			.bind("click", (function(itemSelectCb) {
				return function(e) {			
					// stop bubbling
					e.stopPropagation();
					if (typeof itemSelectCb != "undefined") {
						itemSelectCb();
					}					
					_this._onSelect($(".ListWrapperItem").index(this));
				}
			})(itemSelectCb));
			
		this.$container.append(newItem);
		this.numOfItems = $("." + this.DEFAULT_ITEM_CLASS, this.$container).length;
				
		return currIndex;
	},
	
	_makeClosure: function(obj) {
		console.log("makeClosure: with " + obj);
		
		return (function(closured) {
			console.log("---makeClosure.anonym: with " + closured);
			return function() {
				var c = closured;
				console.log("------makeClosure.anonym.retFn: with " + c);
				return c;
			}			
		})(obj)
	},
	
	/**
	 * Remove the item on the specified position/index
	 * 
	 * @method
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ListWrapper.removeItem
	 * @param {Number} index Removes the item at the specified position/index.
	 * @return {Number} The removed item's index 
	 */
	removeItem: function(index) {
		var index = parseInt(index),
			itemClassName = this.DEFAULT_ITEM_CLASS;		
	
		index = (index >= 0 && index <= max) ? index : this.selectedIndex;
		
		if (index > -1) {
			$("." + itemClassName, this.$container)
				.eq(index)
					.fadeOut("fast", function() {
						$(this).remove();
					});
				
			// updating controller informations & resetting to default selection
			this.numOfItems = $("." + itemClassName, this.$container).length; 	
			this.selectedIndex =  (this.numOfItems > 0) ? 0 : -1;			
			this._selectItem(this.selectedIndex);
		}
		
		return index;
	},
	
	
	/**
	 * Use this method to manually change item-selection by passing
	 * a valid index. 
	 * 
	 * @method
	 * @private
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ListWrapper._selectItem
	 * @param {Number} index Index of the newly selected item
	 * @return {Number} Index of the newly selected item
	 */
	_selectItem: function(index) {
		var index = parseInt(index),
			max = this.numOfItems,
			itemClassName = this.DEFAULT_ITEM_CLASS,
			selItemClassName = this.DEFAULT_SELECTED_ITEM_CLASS;
		
		if (index >= 0 && index <= max) {
			
			this.selectedIndex =  index;						
			
			$("." + itemClassName, this.$container)
				.removeClass(selItemClassName)
				.eq(index)
					.addClass(selItemClassName);
			
			console.log("ListWrapper._selectItem: selected: " + index);
			
			return index;
		}
		else {
			throw new RangeError("ListWrapper._selectItem(index): Invalid index passed");		
		}
	},
	
	/**
	 * Used as default callback-function, when item-selection has changed. 
	 * 
	 * @method
	 * @private
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ListWrapper._onSelect
	 * @param {String} id DOM-element ID of the newly selected item.
	 */
	_onSelect: function(idx) {
		//var re = RegExp(this.ITEM_ID_PREFIX + "(\\d+)").exec(id);
		
		//if (!!!re || re.length != 2) {
		//	return;
		//}
		this._selectItem(idx);
		this.observerCbs.forEach(function(cb) {
			cb(idx);
		});
	},
	
	
	/**
	 * Use this method to subscribe for events. <i>(Currently only the <b>select</b>
	 * -event is implemented)</i>
	 * 
	 * @alias GLab.Sys.Classes.GLab.Sys.Classes.ListWrapper.subscribe
	 * @method
	 * @param {String} ename Event-name to subscribe for
	 * @param {Function} fn Callback-function that will be fired, when the Event is triggered.
	 */
	subscribe: function(ename, fn) {
		if (ename != "select" || typeof fn != "function") {
			throw new TypeError("ListWrapper.subscribe: Cannot add event subscription; invalid arguments");
		}
		
		this.observerCbs.push(fn);
		
	}
	
});/**
 *
 * @author peter geil
 * 
 */



GLab.Sys.Classes.PresetManager = GLab.Sys.Classes.Class.extend({
	
	// Object components/fields
	//
	listController:	undefined,	// Holds reference to a GLab.Sys.Classes.ListWrapper instance
	presetList:	[],			// Holds ColorGradients 	
	
	
	/**
	 * Creates a new PresetManager-instance.
	 * 
	 * @classDescription PresetManager is a high-level component
	 * whose purpose is to handle creation, removal and application
	 * of presets for ColorSlider-components. In addition, a PresetManager
	 * can be bound to ListWrapper-instance, so that internal-states can be reflected
	 * to a part of the View-layer and, vice versa, changes in the View-layer will
	 * affect the PresetManager-instance.
	 * 
	 * @constructor
	 * @alias GLab.Sys.Classes.PresetManager
	 * @param {ListWrapper} wl Will be used as 
	 */
	init: function(wl) {
		var C = GLab.Sys.Classes;
		
		if (!(wl instanceof C.ListWrapper)) {
			throw new TypeError("PresetManager: Cannot create new instance; " +
				"ListWrapper instance expected, invalid one received.");
		}
			
		this.listController = wl;		
	},
	
	_makeClosure: function(obj) {
		console.log("makeClosure: with " + obj);
		
		return (function(closured) {
			console.log("---makeClosure.anonym: with " + closured);
			return function() {
				var c = closured;
				console.log("------makeClosure.anonym.retFn: with " + c);
				return c;
			}			
		})(obj)
	},
	
	/**
	 * 
	 * @param {Object} cg
	 */
	addPreset: function(cg) {
		if (!(cg instanceof GLab.Sys.Classes.ColorGradient)) {
			throw new TypeError("PresetManager: Cannot add preset; invalid arguments received");
		}
		
		var newIndex,
			_this = this;		
		
		newIndex = this.listController.addItem(cg.getName(), {
			onSelect: (function(cgr){
                // creating a separate scope
				return function() {
					GLab.ColorSlider.applyColorGradient(cgr);
				}		
			})(cg)									
		});		
        
		this.presetList[newIndex] = cg;
	},
	
	removePreset: function() {
		var idx = this.listController.removeItem();
				
		// nothing selected (shouldn't arrive)
		if (idx == -1) {
			return;
		}
	
		console.log("PresetManager.removePreset: Removed Preset# " + idx + " (" + this.presetList.splice(idx, 1) + ")");
		console.log(this.presetList);
	},
	
	dump: function() {
		
		for (var i=0; i < this.presetList.length; i++) {
			console.log(this.presetList[i]);
		} 
	}


});
/**
 *
 * @author peter
 * 
 */
GLab.Sys.Classes.SliderNeedle = GLab.Sys.Classes.Class.extend({
	
	/*
	 * Object components/fields
	 * 
	 */
	id:					undefined,		// Value of id-attribute
	needleElem:			undefined,		// Reference to DOMElement
	defaultClassNames:	"sliderNeedle",	// Default CSS classes
	defaultElemType:	"div",			// Default HTML element type
	defaultText:		"Color stop:",	// Default text
	defaultIdPrefix:	"sln_",			// Default value that will be prefixed to the counter value
	
		
	/*
	 * Contructor
	 * 
	 */				
	init: function() {
			var currNum = GLab.Sys.Classes.SliderNeedle.instanceCounter();
			this.id = this.defaultIdPrefix + currNum;
			
			this.needleElem = $(
				  "<" + this.defaultElemType + " "
				+ "class=\"" + this.defaultClassNames + "\" " 
				+ "id=\"" + this.id + "\">" 
				+ this.defaultText + "</" + this.defaultElemType + ">");
		},
	
	
	/*
	 * Methods
	 * 
	 */
		
	/**
	 * Appends the needle's HTMLElement under the surface to the specified 
	 * HTMLElement inside the DOM.
	 * 
	 * @param {HTMLElement} parent Where the needle should be appended to.
	 */
	appendTo: function(parent) {
		if (parent instanceof HTMLElement) {
			$(parent).append(this.needleElem);
		}
		else {
			throw new TypeError("Cannot append SliderNeedle; expected parent element of type HTMLElement, other type received");
		}					
	},
	
	/**
	 * Quick'n'dirty fix to expose the needle's HTMLElement.
	 * 
	 * @return {HTMLElement} The corresponding HTMLElement of this SliderNeedle
	 */
	getDomNode: function() {
		return this.needleElem;
	},
	
	
	moveTo: function(pos) {
		if (typeof pos == "number") {
			$(this.needleElem).css("top", pos);
		}
	},	
	
	die: function() {
		
		var a = $(this.needleElem).get(0);
		var b = a.parentNode;
		b.removeChild(a);
		
		//$(this.needleElem).fadeOut(450, function() {
			//$(this.needleElem).remove();
		//}); 
	}
				
});

// implemented needle counter as static property
GLab.Sys.Classes.SliderNeedle.instanceCounter = (function() {
	var _counter = 0;
	
	return function() {
		return ++_counter;
	};
})();
/**
 *
 * @author peter
 * 
 */
GLab.Sys.Classes.SliderNeedleWrapper = GLab.Sys.Classes.Class.extend({
	
	/*
	 * Object components/fields
	 * 
	 */
	
	id:					undefined,	// ID attribute of the wrapped SliderNeedle isntance
	currentColor:		undefined,	// currently selected color-value
	currentPosition:	undefined,
	needleInstance:		undefined,	// reference to the wrapped SliderNeedle instance
	infoElem:			undefined,	// reference to DOMElement of Cp's & Rem-Btn's parent Elmenent
	colorpickerElem:	undefined,	// reference to DOMElement of ColorPicker control
	remNeedleBtnElem:	undefined,	// reference to DOMElement of "remove"-button
	needleMoveCb:		undefined,	// cb function fired when needle was moved
	removeNeedleCb:		undefined,	// cb function fired when needle removal is triggered
	colorChangeCb:		undefined,	// cn function getting fired when color changes
	
	
	
	/*
	 * Constructor
	 * 
	 */
	
	/**
	 * Constructor method
	 * 
	 * @param {SliderNeedle} needle SliderNeedle instance that will be wrapped.
	 * @param {Object} params Initializing parameters; (defaultColor, onNeedleMove, onRemoveNeedle, onColorChange)
	 */
	init: function(params) {
		var needle = new GLab.Sys.Classes.SliderNeedle();
		if (needle instanceof GLab.Sys.Classes.SliderNeedle) {
			this.needleInstance = needle;
			this.id = needle.id;
			
			
			// setting up event "listener"
			this.needleMoveCb = (typeof params.onNeedleMove == "function") ? params.onNeedleMove : this.needleMoveCb;
			this.removeNeedleCb = (typeof params.onRemoveNeedle == "function") ? params.onRemoveNeedle : this.removeNeedleCb;
			this.colorChangeCb = (typeof params.onColorChange == "function") ? params.onColorChange : this.colorChangeCb;
			
			this._prepareNeedleWrapper();
			this.setColor(params.defaultColor);
			// moving to spawn position
			if (!!params.position) {
				this.moveTo(params.position);
			}
			
		}
		else {
			throw new TypeError("Cannot create NeedleWrapper; type of SliderNeedle expected, other type receiver");
		}
	},
	
	
	
	/*
	 * Methods
	 * 
	 */
	
	/**
	 * Helper method used to create and compose the HTMLElements
	 */
	// TODO: Optimize prepareNeedleWrapper and appendTo
	_prepareNeedleWrapper: function() {
		if (this.needleInstance !== undefined) {
			this.infoElem = $("<article rel=\"" + this.id + "\"></article>");
			this.colorpickerElem = $("<input class=\"colorPickerInput\" rel=\"" + this.id + "\">").appendTo(this.infoElem);
			this.remNeedleBtnElem = $("<button rel=\"" + this.id + "\">-</button>").appendTo(this.infoElem);										
		}
		else {
			throw new TypeError("Cannot prepare NeedleWrapper; needle component is unset");
		}
	},
	
	
	/**
	 * Appends the underlying HTMLElements to an HTMLElement inside the DOM.
	 * 
	 * @param {HTMLElement} parent Where the HTMLElements will be added to.
	 */
	appendTo: function(parent) {
		if (!!parent && parent instanceof HTMLElement) {
			
			this.needleInstance.appendTo(parent);
			$(this.infoElem).appendTo(parent);	
			
			this._addDragEventListener(this.needleInstance.getDomNode());
			this._addColorChangeListener(this.colorpickerElem);
			this._addRemoveNeedleListener(this.remNeedleBtnElem);
		}
		else {
			throw new TypeError("Cannot append NeedleWrapper; received invalid parent Node, must be of type HTMLElement ");
		}
	},
	
	_addDragEventListener: function(to) {
		var _this = this; // bridge to "outer" scope
		
		$(to).draggable({
			axis: "y",
			containment: "parent",
			snap: true,

			start: function(e, ui) {
				$(_this.infoElem).css("opacity", "0.3");
			},
			stop: function(e, ui) {
				_this.currentPosition = ui.position.top;
				$(_this.infoElem)
					.css("top", ui.position.top)
					.fadeTo("slow", 1);
				if (_this.needleMoveCb !== undefined) {
					_this.needleMoveCb(
						this.id, { 
							x: Math.round(ui.position.left), 
							y: Math.round(ui.position.top)
						});
				}
			}
		});
	},
	
	_addRemoveNeedleListener: function(to) {
		var _this = this; // bridge to "outer" scope
		
		$(to).click(function() {
			console.info("Removal of \"" + _this.id + "\" triggered");
			if (_this.removeNeedleCb !== undefined) {
				_this.removeNeedleCb(_this.id);
			}
		});
	},
	
	_addColorChangeListener:function(to) {
		var _this = this; // bridge to "outer" scope
		
		$(to).ColorPicker({
			onSubmit: function(hsb, hex, rgb, el) {
				// updating input field
				$(el)
					.css(	"background-color", 
							"rgba(" + 
							rgb.r + "," + 
							rgb.g + "," + 
							rgb.b + ", 0.2)")
					.val(hex);
				
				//_this.currentColor = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 1)";
				
				// buffering as GLab.Sys.Classes.Color instance
				_this.currentColor = new GLab.Sys.Classes.Color(
					rgb.r,
					rgb.g,
					rgb.b,
					hex	// hex-string as title
				);
				
				// hide DOM element
				$(el).ColorPickerHide();
				
				// when cb is supplied, call it
				if (_this.colorChangeCb !== undefined) {
					_this.colorChangeCb();
				}
			},
			onBeforeShow: function () {
				$(this).ColorPickerSetColor(this.value);
			}
		});
	},
		
	remove: function() {
		// removing infoelems (implicit removal of event-bindings)
		
		//$(this.infoElem).remove(); 	
		
		var a = $(this.infoElem).get(0);
		var b = a.parentNode;
		b.removeChild(a);
		
		// removing needle (implicit removal of event-bindings)
		this.needleInstance.die();
		
	},
					
	setColor: function(color, name) {
		this.currentColor = color;
		$(this.colorpickerElem)
			.css("background-color", color.toRGBA(0.2))
			.val(color.getName());
		//console.log("Color manually changed to: " + this.currentColor);
	},
	
	getColor: function() {
		return this.currentColor;
	},
	
	getPosition: function() {
		return this.currentPosition;
	},
	
	getClientRect: function() {
		//as
	},
	
	getId: function() {
		return this.id;
	},
	
	
	moveTo: function(newY) {
		this.currentPosition = newY;
		this.needleInstance.moveTo(newY);
		$(this.infoElem).css("top", newY);
		this.needleMoveCb(this.id, newY);
	}
});/**
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
