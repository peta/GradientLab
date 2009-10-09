/**
 *
 * @author peter
 * 
 */

 jQuery.fn.extend({
	
	/**
	 * Aligns the jqueried Element centered to the Element
	 * passed as "target" parameter. Utilizes the CSS properties: position/top/left.
	 * 
	 * @alias jQuery.alignCenteredOver
	 * @alias $.alignCenteredOver
	 * @param {jQuery} target Where the element will be aligned to.
	 * @return {jQuery}
	 */
	alignCenteredOver: function(target) {
		if (target instanceof jQuery) {
			var t		= 	$(target),
				m 		= 	this.get(0);
			
			if (t.length) {
				this.css({
					"position":	"absolute",
					"left":	 ((m.offsetWidth - t.offsetWidth) / 2) * (-1) + t.offsetLeft,
					"top":	((m.offsetHeight - t.offsetHeight) / 2) * (-1) + t.offsetTop
				});
			}
		}					
		return this;
	},
	
	
	/**
	 * Can only be called on Input elements. Validates
	 * an Input element's value type against the one declared
	 * inside its <i>"type" attribute</i>.
	 * 
	 * @alias jQuery.validateValueType
	 * @alias $.validateValueType
	 * @return {Boolean} Have all Input elements valid values
	 */
	// TODO: Implement more value types of the current HTML5 draft
	validateValueType: function() {
		var isEverythingSweet = true,
			fnValidate = function(elem) {
				if (elem.getAttribute("type").toLowerCase() == "number") {
					return !isNaN(parseInt(elem.value));
				}
				else {
					return !!elem.value.length;
				}
			};
			
		this.each(function() {
			if (this instanceof HTMLInputElement) {
				isEverythingSweet &= fnValidate(this);
				return true;
			}
			return false;
		});
		
		return isEverythingSweet;
	}
	
	
});



jQuery.extend({
	/**
	 * Return the middlepoint of the passed jQuery object
	 * when it's appended to the DOM.
	 * 
	 * @param {jQuery} me Of whom the middlepoint should be calculated
	 * @return {Point} Object with two key/value pairs: <b>x</b> and <b>y</b>
	 */
	getMiddlePointOf: function(me) {
		if (me instanceof jQuery) {
			var elem = me.get(0);
			return {
				x: elem.offsetWidth / 2 + elem.offsetLeft,
				y: elem.offsetHeight / 2 + elem.offsetTop
			};
		}
		return undefined;
	},
	
	/**
	 * Returns the capitalized String representation of
	 * the passed argument
	 * 
	 * @alias jQuery.capitalizeStr
	 * @alias $.capitalizeStr
	 * @param {String} str String to be capitalized
	 */
	capitalizeStr: function(str) {
		str = str.toString();
		return str[0].toUpperCase() + str.substring(1, str.length);
	}
});
