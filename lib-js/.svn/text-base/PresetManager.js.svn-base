/**
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
