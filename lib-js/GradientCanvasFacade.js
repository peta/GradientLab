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
});