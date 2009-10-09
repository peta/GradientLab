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
