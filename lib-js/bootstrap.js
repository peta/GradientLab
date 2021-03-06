/**
 *
 * @author peter
 * 
 */

$(function() {
	
	
		
			

	// ------------------------------------------------
	// ------------------------------------------------
	var initStack = {
		setupResizeListener: function() {
			
			var hasLayoutChanged = false;	
			
			
            $("#stage").draggable().resizable({
				autoHide: false,
				handles: 'e, s, se',
				resize: function(e, ui){
					$("canvas#demoCv").css({
						width: ui.size.width,
						height: ui.size.height
					}).attr("width", ui.size.width).attr("height", ui.size.height);
					$("#stage").css({
						width: ui.size.width + 5,
						height: ui.size.height + 59
					});
				},
				stop: function(e, ui) {
					GLab.Facade.update();
					if (!hasLayoutChanged) {
						hasLayoutChanged = true;
						
						// INSPECTOR PALETTES
						//
						var insp = $("aside#inspector"); 
						insp.css({
							right: 	  window.innerWidth 
									- insp.get(0).offsetLeft 
									- insp.get(0).offsetWidth,
							top: insp.get(0).offsetTop,
							position: "absolute"		
						});
						
						$("aside#inspector")
							.animate({
								right: "50px",
								top: "140px",
								left: "auto"
							}, {
								queue: true,
								duration: 800,
								easing: "swing"
							});
						
						// HEADER ELEMENTS
						//
						$("header > hr")
							.animate({
								"borderWidth": "25px"
							}, {
								queue: true,
								duration: 500
							}).css({
								"-moz-box-shadow": "-21px -23px 76px #222222"
							});
						
						$("header > h1")
							.css({
								"position": "absolute"
							})
							.animate({
								"left": "69px",
								"top": "-22px"
							}, {
								queue: true,
								duration: 1800,
								easing: "swing"
							})
							.css({
								"textShadow": "3px 2px 0 #CCCCCC",
								"fontSize": "2em",
								"z-index": "1"
							});
						
						$("header > p")
							.css({
								"position": "absolute"
							})
							.animate({
								"left": "256px",
								"top": "6px"
							}, {
								queue: true,
								duration: 1500,
								easing: "swing"
							})
							.css({
								"z-index": "1"
							});
						$("header > p > em.keyword").css({
							"color": "#666666",
							"textShadow": "2px 2px 2px #CCCCCC"
						});
						
						// FOOTER ELEMENTS
						//
						$("footer > p").css("position", "fixed").filter(":first").animate({
							bottom: "75px"
						}, {
							queue: true,
							duration: 750,
							easing: "swing"
						}).end().filter(":last").animate({
							bottom: "50px"
						}, {
							queue: true,
							duration: 850,
							easing: "swing"
						});
					}
				}
			});

		},
		
		setupColorSlider: function() {
			
			GLab.Facade = new GLab.Sys.Classes.GradientCanvasFacade();
			
			var previewCv = new GLab.Sys.Classes.CanvasWrapper( $("canvas#demoCv").get(0) );
			// NOTE THE REGISTRATION AS PREVIEW-CANVAS
			GLab.Facade.registerAsPreview(previewCv);
			
			var sliderCv = new GLab.Sys.Classes.CanvasWrapper( $("canvas#ctrlPreview").get(0) );
			// NOTE THE REGISTRATION AS CONTROLLER-CANVAS
			GLab.Facade.registerAsController(sliderCv)				
			
			GLab.ColorSlider = new GLab.Sys.Classes.ColorSlider({
				 gradientCanvasFacade: GLab.Facade, 
				 sliderContainer: $("div#slider").get(0),
				 onAddNeedle: function(needleCount) {
					$("small#needle-counter").text(needleCount); 	
				 },
				 onRemoveNeedle: function(needleCount) {
				 	$("small#needle-counter").text(needleCount);
				 },
				 onExportJS: function(code) {
				 	console.info("JavaScript code export triggered");
				 }
			});
			
			// for demoing let's add three color needles
			GLab.ColorSlider.addNeedle(new GLab.Sys.Classes.ColorStop(
				0.0,
				new GLab.Sys.Classes.Color(255,0,0, "FF0000")
			));
			GLab.ColorSlider.addNeedle(new GLab.Sys.Classes.ColorStop(
				0.5,
				new GLab.Sys.Classes.Color(0,255,0, "00FF00")
			));
			GLab.ColorSlider.addNeedle(new GLab.Sys.Classes.ColorStop(
				1.0,
				new GLab.Sys.Classes.Color(0,0,255, "0000FF")
			));			
			/*
			 * Though the ColorSlider class is not responsible for handling 
			 * user interactions taking place in the View-layer of this application,
			 * we add here some event listeners which will be bound directly to
			 * an according ColorSlider/GCFacade instance.
			 * 
			 */
			$("button#btnExportJsCode").click(function() {
				$("#exportDlg").fadeIn("slow", function() {
				    $("#exportMenu").show().trigger("dialogActive", {cg: GLab.Facade.exportAsColorGradient()});
				});
			});
			$("button#btnInsertNewColorStop").click(function() {
				GLab.ColorSlider.addNeedle();
			});
			$("select#liGradientType").bind("change", function() {
				GLab.Facade.setGradientType($(this).val());
			});	
		},
		
		
		setupGradientAngleSelector: function() {
			
			//$("div#rangedummy").alignCenteredOver($("input#tbGradientAngle")).hide();
			$("#gradient-angle-overlay").alignCenteredOver($("#demoCv"));
			
			var midPointOfOverlay = $.getMiddlePointOf($("img#gradient-angle-overlay")),
				defaultPointOfOverlay = {
					x: $("img#gradient-angle-overlay").css("left"),
					y: $("img#gradient-angle-overlay").css("top")
				};

			$("input#tbGradientAngle")
				.bind("change", function(e) {
					// TODO: Implement a stricter and more low-level mechanism to set gradient angle restrictions
					var reResult = /(\d+)/.exec($(this).val());
					if (reResult.length == 2) {
						GLab.Facade.setAngle((reResult[1] <= 180) ? reResult[1] : 180);
					}
				})				
				.bind("mousedown", function(e) {
			
					// some initial animantion
					$("img#gradient-angle-overlay")
						.css({
							left: 		midPointOfOverlay.x,
							top: 		midPointOfOverlay.y
						})
						.animate({
							width: 		"326px", 
							height: 	"255px", 
							opacity: 	1,
							left:		defaultPointOfOverlay.x,
							top:		defaultPointOfOverlay.y
						}, {
							queue: false,
							duration: 200
						});
			
					//used as reference value
					var refX = e.clientX;
					
					var maxDegree = 90;
					var range = 90;
					var degreePerUnit = maxDegree / range;
					//console.info("maxDegree/range/degreePerUnit " + maxDegree + ", " + range + ", " + degreePerUnit);
					
					var r_min = -1 * range / 2 + refX;
					//console.info("r_min: " + r_min);
					var r_max = range / 2 + refX;
					//console.info("r_max: " + r_max);
					
					// avoiding endless overlaoding
					var x,		
						diff,	
						deg;
						
					$("body").bind("mousemove", function(e) {
				
							// shortening acces to current clientLeft						
							x = e.clientX;
							if (x < r_max && x > r_min) {
								diff = x - r_min;
								deg = diff * degreePerUnit;
							}
							else {
								deg = (x < r_min) ? 0 : maxDegree;	
							}
							
							$("input#tbGradientAngle").val(deg + "°");
							$("img#gradient-angle-overlay").css("-moz-transform", "rotate(" + deg + "deg)");						
					});
					
					$("body").bind("mouseup", function() {
						$("img#gradient-angle-overlay")
							.animate({
								width: 		"0", 
								height: 	"0", 
								opacity:	0,
								left:		midPointOfOverlay.x,
								top:		midPointOfOverlay.y
							}, {
								queue: 		false,
								duration:	150
							})
							.css({
								left:		defaultPointOfOverlay.x,
								top:		defaultPointOfOverlay.y
							});
						$("body").unbind();
						$("input#tbGradientAngle").trigger("change");
					});
				});
		},
		
		armCodeExportDlg: function() {
			$("#exportMenu")
				.bind("dialogActive", function(e, data) {
					$("button#btnClose, #exportDlg", this).bind("click", function() {
						$("#exportMenu, #exportDlg").hide();
						});
					$(this).data("cg", data.cg);
					$("#exportMenu input")
						.bind("change", function(e) {
							if ($(this).validateValueType()) 
							{
								$(this).css("background-color", "rgba(0,255,0,0.3)");
								$("#exportMenu").trigger("inputChanged");
							}
							else {
								$(this).css("background-color", "rgba(255,0,0,0.3)");
								return false;
							}
					});
					
					// firing init check
					$("input#elementId").trigger("change");		
					$("input#widthInPx").trigger("change");		
					$("input#heightInPx").trigger("change");		
				})
				.bind("inputChanged", function(e) {
						if (!$("input#heightInPx, input#widthInPx, input#elementId").validateValueType()) {
							return false;
						}
						var id = $("input#elementId").val(),
							w = parseInt($("input#widthInPx").val()),
							h = parseInt($("input#heightInPx").val()),
							genCode = GLab.Utils.generateJsCode(id, $("#exportMenu").data("cg"), h, w);

						$("code#codeOutput").text(genCode);
					});
		},
		
		setupPresetManager: function() {
			var pmElem = $("ul#presetList").get(0),
				lw = new GLab.Sys.Classes.ListWrapper(pmElem),
				cg = GLab.Facade.exportAsColorGradient();
				
			GLab.PresetManager = new GLab.Sys.Classes.PresetManager(lw);
			GLab.PresetManager.addPreset(cg);
			GLab.PresetManager.addPreset(new GLab.Sys.Classes.ColorGradient("two", [new GLab.Sys.Classes.ColorStop(0.0, new GLab.Sys.Classes.Color(255,0,0)), new GLab.Sys.Classes.ColorStop(1.0, new GLab.Sys.Classes.Color(255,0,255))], "linear", 5));
			GLab.PresetManager.addPreset(new GLab.Sys.Classes.ColorGradient("three", [new GLab.Sys.Classes.ColorStop(0.0, new GLab.Sys.Classes.Color(255,0,0))], "linear", 0));
			
			
			$("button#btnAddPreset").bind("click", function() {
				GLab.PresetManager.addPreset( GLab.Facade.exportAsColorGradient() );
			});
			
			$("button#btnDeletePreset").bind("click", function() {
				GLab.PresetManager.removePreset();
			});
         
		}


		
	// ------------------------------------------------
	// ------------------------------------------------
	};
	
	
	
	for (var proc in initStack) {
    	//console.log("Bootstrap:  calling " + proc);
		initStack[proc]();
	}	
    
    
});