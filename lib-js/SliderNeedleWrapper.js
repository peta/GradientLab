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
});