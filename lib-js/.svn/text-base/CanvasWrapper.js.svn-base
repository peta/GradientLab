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
					
	
});