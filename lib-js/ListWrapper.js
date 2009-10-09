/**
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
	
});