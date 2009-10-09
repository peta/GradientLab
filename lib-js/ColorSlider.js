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
	
});