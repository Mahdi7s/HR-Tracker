Type.registerNamespace("Telerik.Web.UI.ImageEditor");
(function(c,a,b){b.Crop=function(d){b.Crop.initializeBase(this,[d]);
};
b.Crop.prototype={initialize:function(){b.Crop.callBaseMethod(this,"initialize");
this._xTxt=this._getControlFromParent("txtX");
this._yTxt=this._getControlFromParent("txtY");
this._widthTxt=this._getControlFromParent("txtWidth");
this._heightTxt=this._getControlFromParent("txtHeight");
this._presetDD=this._findControlFromParent("rieAspectRatio");
this._cropBtn=this._findControlFromParent("btnApply");
this._cancelBtn=this._findControlFromParent("btnCancel");
this._constraintBtn=this._findControlFromParent("btnConstraint");
this._swapBtn=this._findControlFromParent("btnSwap");
this._sizeRatio=null;
this._zoomLevel=this._getImageZoomLevel();
this._createCropBox();
this._updateControlsFromCropBox();
this._constraintBtnClick(this._constraintBtn);
this._attachHandlers(true);
this.get_imageEditor().get_formDecorator().decorate($get(this.get_parentId()+"Table"));
},dispose:function(){this._attachHandlers(false);
this._disposeCropBox();
b.Crop.callBaseMethod(this,"dispose");
},onClose:function(){this._cropBox.hide();
},onOpen:function(){try{this._cropBox.show();
var f=this._getViewportScroll();
this._xTxt.value=f.x;
this._yTxt.value=f.y;
this._updateCropBoxFromControls();
}catch(d){}},crop:function(e){this.get_imageEditor()._cropImage(e,true);
var d=new Sys.UI.Bounds(0,0,e.width,e.height);
this._updateControlsWithFixedBounds(d);
this._updateCropBoxFromControls();
this._setCropBoxConstraints(this._toScaledBounds(d));
},set_width:function(d){var f=this.get_imageSize();
var e=this._cropBox.getBounds();
d=this._restrictValue(d,0,f.width-e.x);
d=this._applyWidthConstraintRatio(d,f.height-e.y);
this.set_inputValue(this._widthTxt,d);
},set_height:function(d){var f=this.get_imageSize();
var e=this._cropBox.getBounds();
d=this._restrictValue(d,0,f.height-e.y);
d=this._applyHeightConstraintRatio(d,f.width-e.y);
this.set_inputValue(this._heightTxt,d);
},set_x:function(d){var f=this.get_imageSize();
var e=this._cropBox.getBounds();
d=this._restrictValue(d,0,f.width-e.width);
this.set_inputValue(this._xTxt,d);
},set_y:function(d){var f=this.get_imageSize();
var e=this._cropBox.getBounds();
d=this._restrictValue(d,0,f.height-e.height);
this.set_inputValue(this._yTxt,d);
},set_inputValue:function(d,e){d.value=parseInt(e);
this._updateCropBoxFromControls();
},_restrictValue:function(d,e,f){return Math.max(e,Math.min(f,d));
},get_sizeRatio:function(){return this._sizeRatio;
},get_freshSizeRatio:function(){return parseInt(this._widthTxt.value)/parseInt(this._heightTxt.value);
},get_imageSize:function(){var d=this.get_imageEditor().getEditableImage();
return{width:d.get_width(),height:d.get_height()};
},_applyWidthConstraintRatio:function(d,e){if(this._constraintBtn.get_checked()){var f=this.get_sizeRatio();
var g=this._restrictValue(parseInt(d/f),0,e);
this._heightTxt.value=g;
if(g>=e){d=g*f;
}}return d;
},_applyHeightConstraintRatio:function(d,g){if(this._constraintBtn.get_checked()){var f=this.get_sizeRatio();
var e=this._restrictValue(d*f,0,g);
this._widthTxt.value=e;
if(e>=g){d=e/f;
}}return d;
},_attachHandlers:function(d){this._attachButtonHandler(this._cropBtn,"_cropBtnClick",d);
this._attachButtonHandler(this._cancelBtn,"_cancelBtnClick",d);
this._attachButtonHandler(this._constraintBtn,"_constraintBtnClick",d);
this._attachButtonHandler(this._swapBtn,"_swapBtnClick",d);
if(d){this._presetDDDelegate=Function.createDelegate(this,this._presetDDHandler);
this._presetDD.add_selectedIndexChanged(this._presetDDDelegate);
this._changeXDelegate=Function.createDelegate(this,this._changeXHandler);
$telerik.addHandler(this._xTxt,"keyup",this._changeXDelegate);
this._changeYDelegate=Function.createDelegate(this,this._changeYHandler);
$telerik.addHandler(this._yTxt,"keyup",this._changeYDelegate);
this._changeWidthDelegate=Function.createDelegate(this,this._changeWidthHandler);
$telerik.addHandler(this._widthTxt,"keyup",this._changeWidthDelegate);
this._changeHeightDelegate=Function.createDelegate(this,this._changeHeightHandler);
$telerik.addHandler(this._heightTxt,"keyup",this._changeHeightDelegate);
this.updateCropBoxFromImageDelegate=Function.createDelegate(this,this._updateCropBoxFromImageHandler);
this.get_imageEditor().getEditableImage().add_imageReload(this.updateCropBoxFromImageDelegate);
}else{$telerik.removeHandler(this._xTxt,"keyup",this._changeXDelegate);
$telerik.removeHandler(this._yTxt,"keyup",this._changeYDelegate);
$telerik.removeHandler(this._widthTxt,"keyup",this._changeWidthDelegate);
$telerik.removeHandler(this._heightTxt,"keyup",this._changeHeightDelegate);
this._changeXDelegate=this._changeYDelegate=this._changeWidthDelegate=this._changeHeightDelegate=null;
this.get_imageEditor().getEditableImage().remove_imageReload(this.updateCropBoxFromImageDelegate);
delete this.updateCropBoxFromImageDelegate;
}},_attachButtonHandler:function(d,f,e){var h=f+"Delegate";
if(e){var g=this[h]=Function.createDelegate(this,this[f]);
d.add_clicked(g);
}else{d.remove_clicked(this[h]);
delete this[h];
}},_changeXHandler:function(d){this._changeDimensionHandler("set_x",d);
},_changeYHandler:function(d){this._changeDimensionHandler("set_y",d);
},_changeWidthHandler:function(d){this._changeDimensionHandler("set_width",d);
},_changeHeightHandler:function(d){this._changeDimensionHandler("set_height",d);
},_changeDimensionHandler:function(f,e){var d=this._getInputValueHandler(e);
if(!isNaN(d)){this[f](d);
}},_getInputValueHandler:function(e){var f=e.keyCode;
var d=e.target;
switch(f){case 38:$telerik.cancelRawEvent(e.rawEvent);
return this._incrementInputValue(d);
case 40:$telerik.cancelRawEvent(e.rawEvent);
return this._decrementInputValue(d);
case 27:$telerik.cancelRawEvent(e.rawEvent);
return;
default:if(this.isNumeric(f)||this.isBackspaceOrDelete(f)){return parseInt(d.value);
}}},_incrementInputValue:function(d,e){return parseInt(d.value)+1;
},_decrementInputValue:function(d,e){return parseInt(d.value)-1;
},_presetDDHandler:function(e,j){var f=j.get_item().get_value().split(",");
if(f.length==2){var g={width:parseInt(f[0]),height:parseInt(f[1])};
var d=g.width/g.height;
var h=this._cropBox.get_maxWidth()/this._cropBox.get_maxHeight();
var i=d>h?"width":"height";
this._constraintBtn.set_checked(true);
this._sizeRatio=d;
this._setCropBoxRatio(d);
this["set_"+i](g[i]);
this._updateCropBoxFromControls();
}},_cropBtnClick:function(d,e){this.crop(this._collectBounds());
},_cancelBtnClick:function(d,e){this.close();
},_swapBtnClick:function(d,e){this._setCropSize(this._heightTxt.value,this._widthTxt.value);
this._updateCropBoxFromControls();
},_constraintBtnClick:function(d,e){var f=d.get_checked()?this.get_freshSizeRatio():null;
this._setCropBoxRatio(f);
this._sizeRatio=f;
},_setCropBoxRatio:function(d){this._cropBox.set_sizeRatio(d);
},_createCropBox:function(){if(this._cropBox){this._disposeCropBox();
}this._cropBox=new b.DraggableResizeBox(this._imageEditor.get_viewport());
this._cropBoxBoundsChangedDelegate=Function.createDelegate(this,this._cropBoxBoundsChangedHandler);
this._cropBox.add_boundsChanged(this._cropBoxBoundsChangedDelegate);
this._setCropBoxConstraints();
},_setCropBoxConstraints:function(f){var d=this._imageEditor.getEditableImage();
var e=d.get_zoomLevel()/100;
this._cropBox.set_constraints(f||new Sys.UI.Bounds(0,0,parseInt(d.get_width()*e),parseInt(d.get_height()*e)));
},_zoomCropBox:function(){var d=this._collectBounds();
this._updateCropBoxFromControls();
},_disposeCropBox:function(){this._cropBoxBoundsChangedDelegate=this._cropBox.remove_boundsChanged(this._cropBoxBoundsChangedDelegate);
this._cropBox=this._cropBox.dispose();
},_disposeViewportControl:function(){try{var d=this._imageEditor.get_viewport();
if(typeof(d.control)!=="undefined"){delete d.control;
}}catch(f){}},_setCropSize:function(d,e){this._widthTxt.value=d;
this._heightTxt.value=e;
},_updateCropBoxFromControls:function(){var d=this._toScaledBounds(this._collectBounds());
this._cropBox.setBounds(d);
},_collectBounds:function(){return new Sys.UI.Bounds(parseInt(this._xTxt.value),parseInt(this._yTxt.value),parseInt(this._widthTxt.value),parseInt(this._heightTxt.value));
},_updateControlsFromCropBox:function(){var d=this._fromScaledBounds(this._cropBox.getBounds());
this._updateControlsWithFixedBounds(d);
},_cropBoxBoundsChangedHandler:function(e,d){this._updateControlsWithBounds(d.getBounds());
},_updateControlsWithBounds:function(e){var d=this._fromScaledBounds(e);
this._updateControlsWithFixedBounds(d);
},_updateControlsWithFixedBounds:function(e){for(var d in e){this["_"+d+"Txt"].value=e[d];
}},_updateCropBoxFromImageHandler:function(d){this._setCropBoxConstraints();
},_fromScaledBounds:function(d){return this._multiplyBounds(d,100/this._zoomLevel);
},_toScaledBounds:function(d){return this._multiplyBounds(d,this._zoomLevel/100);
},_multiplyBounds:function(e,d){return new Sys.UI.Bounds(Math.round(e.x*d),Math.round(e.y*d),Math.round(e.width*d),Math.round(e.height*d));
},_getImageZoomLevel:function(){return this.get_imageEditor().getEditableImage().get_zoomLevel();
},_getViewportScroll:function(){var d=this.get_imageEditor().get_viewport();
return{x:d.scrollLeft,y:d.scrollTop};
},get_name:function(){return"Crop";
},updateUI:function(){try{if(this._getImageZoomLevel()!=this._zoomLevel){this._zoomLevel=this._getImageZoomLevel();
this._updateCropBoxFromControls();
}else{this._updateControlsFromCropBox();
}this._setCropBoxConstraints();
}catch(d){}}};
b.Crop.registerClass("Telerik.Web.UI.ImageEditor.Crop",b.ToolWidget,b.IToolWidget);
})($telerik.$,Telerik.Web.UI,Telerik.Web.UI.ImageEditor);