Type.registerNamespace("Telerik.Web.UI");
Telerik.Web.UI.ProgressAreaContainerName="Panel";
function getRadProgressArea(a){return $find(a);
}Telerik.Web.UI.RadProgressArea=function(a){Telerik.Web.UI.RadProgressArea.initializeBase(this,[a]);
this._progressManagerFound=false;
this._popupVisible=false;
this._width="";
this._height="";
this._skin="";
this._headerText="";
this._rtlCalculated=false;
this._isRightToLeft=false;
this._disposed=false;
$telerik.RadUpload_isIFrameProgress=$telerik.isSafari||$telerik.isOpera;
this._bodyElement=($telerik.standardsMode)?document.documentElement:document.body;
};
Telerik.Web.UI.RadProgressArea.prototype={initialize:function(){Telerik.Web.UI.RadProgressArea.callBaseMethod(this,"initialize");
if(!this.get_progressManagerFound()){alert("Could not find an instance of RadProgressManager or RadAsyncUpload on the page. Are you missing the control declaration?");
}if(this._getIsRightToLeft()){this._applyRightToLeft();
}this._setupControls();
this.cancelClicked=false;
if(this._cancelButtonElement){$telerik.addHandlers(this._cancelButtonElement,{click:this.cancelRequest},this);
$telerik.$(this._cancelButtonElement).bind("mouseover",function(a){var b=$telerik.$(a.target);
if(!b.hasClass("ruButtonHover")){b.addClass("ruButtonHover");
}}).bind("mouseout",function(a){$telerik.$(a.target).removeClass("ruButtonHover");
});
}if(typeof(Telerik.Web.UI.ProgressAreas)=="undefined"){Telerik.Web.UI.ProgressAreas=[];
}Telerik.Web.UI.ProgressAreas[Telerik.Web.UI.ProgressAreas.length]=this;
},dispose:function(){this._disposed=true;
if(this._cancelButtonElement){$telerik.clearHandlers(this._cancelButtonElement);
}Array.remove(Telerik.Web.UI.ProgressAreas,this);
Telerik.Web.UI.RadProgressArea.callBaseMethod(this,"dispose");
},_addSafariDefinition:function(a){a[a.length]=String.format("{0} = new RadUploadSafariProgressArea('{0}');",this.get_id());
},_setupControls:function(){this._clientId=this.get_id();
this._element=$get(this._clientId);
this._primaryProgressBarElement=this._findElement("PrimaryProgressBarInnerDiv");
this._primaryTotalElement=this._findElement("PrimaryTotal");
this._primaryValueElement=this._findElement("PrimaryValue");
this._primaryPercentElement=this._findElement("PrimaryPercent");
this._secondaryProgressBarElement=this._findElement("SecondaryProgressBarInnerDiv");
this._secondaryTotalElement=this._findElement("SecondaryTotal");
this._secondaryValueElement=this._findElement("SecondaryValue");
this._secondaryPercentElement=this._findElement("SecondaryPercent");
this._currentOperationElement=this._findElement("CurrentOperation");
this._timeElapsedElement=this._findElement("TimeElapsed");
this._timeEstimatedElement=this._findElement("TimeEstimated");
this._speedElement=this._findElement("Speed");
this._cancelButtonElement=this._findElement("CancelButton");
this._progressAreaHeader=this._findElement("ProgressAreaHeader");
this.updateTextIndicator(this._progressAreaHeader,this._headerText);
},_setupSafariProgressAreaControls:function(){if($telerik.RadUpload_isIFrameProgress){this._getSafariProgressArea()._primaryProgressBarElement=this._primaryProgressBarElement;
this._getSafariProgressArea()._primaryTotalElement=this._primaryTotalElement;
this._getSafariProgressArea()._primaryValueElement=this._primaryValueElement;
this._getSafariProgressArea()._primaryPercentElement=this._primaryPercentElement;
this._getSafariProgressArea()._secondaryProgressBarElement=this._secondaryProgressBarElement;
this._getSafariProgressArea()._secondaryTotalElement=this._secondaryTotalElement;
this._getSafariProgressArea()._secondaryValueElement=this._secondaryValueElement;
this._getSafariProgressArea()._secondaryPercentElement=this._secondaryPercentElement;
this._getSafariProgressArea()._currentOperationElement=this._currentOperationElement;
this._getSafariProgressArea()._timeElapsedElement=this._timeElapsedElement;
this._getSafariProgressArea()._timeEstimatedElement=this._timeEstimatedElement;
this._getSafariProgressArea()._speedElement=this._speedElement;
this._getSafariProgressArea()._cancelButtonElement=this._cancelButtonElement;
this._getSafariProgressArea()._width=this._width;
this._getSafariProgressArea()._height=this._height;
if(!this._element){this._element=$get(this._clientId);
}this._getSafariProgressArea()._element=this._element;
}},_getSafariProgressArea:function(){if(!this._safariProgressArea){this._safariProgressArea=getRadProgressManager()._safariPoller.contentWindow[this.get_id()];
}return this._safariProgressArea;
},_getIsRightToLeft:function(){if(!this._rtlCalculated){var a=this.get_element();
this._isRightToLeft=$telerik.getCurrentStyle(a,"direction","ltr")=="rtl";
return this._isRightToLeft;
this._rtlCalculated=true;
}return this._isRightToLeft;
},_applyRightToLeft:function(){var a=this.get_element();
if(/RadUploadProgressArea_rtl/.test(a.className)){return;
}$telerik.addCssClasses(a,["RadUploadProgressArea_rtl",String.format("RadUploadProgressArea_{0}_rtl",this._skin)]);
},_findElement:function(b){var a=this._clientId+"_"+Telerik.Web.UI.ProgressAreaContainerName+"_"+b;
return $get(a);
},cancelRequest:function(){this.cancelClicked=true;
},update:function(a){if(this._disposed){return;
}if(!$telerik.RadUpload_isIFrameProgress){var b=new Sys.CancelEventArgs();
b._progressData=a;
b.get_progressData=function(){return this._progressData;
};
this.raiseEvent("progressUpdating",b);
if(b.get_cancel()){return;
}this.show();
b._progressValue=a.PrimaryPercent;
b._progressBarElementName="PrimaryProgressBar";
b._progressBarElement=this._primaryProgressBarElement;
b.get_progressValue=function(){return this._progressValue;
};
b.get_progressBarElementName=function(){return this._progressBarElementName;
};
b.get_progressBarElement=function(){return this._progressBarElement;
};
this.raiseEvent("progressBarUpdating",b);
if(!b.get_cancel()&&!isNaN(a.PrimaryPercent)){this.updateHorizontalProgressBar(this._primaryProgressBarElement,a.PrimaryPercent);
}b._progressValue=a.SecondaryPercent;
b._progressBarElementName="SecondaryProgressBar";
b._progressBarElement=this._secondaryProgressBarElement;
this.raiseEvent("progressBarUpdating",b);
if(!b.get_cancel()&&!isNaN(a.SecondaryPercent)){this.updateHorizontalProgressBar(this._secondaryProgressBarElement,a.SecondaryPercent);
}}else{this.show();
this.updateHorizontalProgressBar(this._primaryProgressBarElement,a.PrimaryPercent);
this.updateHorizontalProgressBar(this._secondaryProgressBarElement,a.SecondaryPercent);
}this.updateTextIndicator(this._primaryTotalElement,a.PrimaryTotal);
this.updateTextIndicator(this._primaryValueElement,a.PrimaryValue);
this.updateTextIndicator(this._primaryPercentElement,a.PrimaryPercent);
this.updateTextIndicator(this._secondaryTotalElement,a.SecondaryTotal);
this.updateTextIndicator(this._secondaryValueElement,a.SecondaryValue);
this.updateTextIndicator(this._secondaryPercentElement,a.SecondaryPercent);
this.updateTextIndicator(this._currentOperationElement,a.CurrentOperationText);
this.updateTextIndicator(this._timeElapsedElement,a.TimeElapsed);
this.updateTextIndicator(this._timeEstimatedElement,a.TimeEstimated);
this.updateTextIndicator(this._speedElement,a.Speed);
},show:function(){if(!this._element){this._element=$get(this._clientId);
}this._element.className=this._element.className.replace(/\s*RadUploadProgressAreaHidden/ig,"");
if(!$telerik.RadUpload_isIFrameProgress&&this._element.style.position=="absolute"){if(!this._popupBehavior){this._popupBehavior=$create(Telerik.Web.PopupBehavior,{id:(new Date()-100)+"PopupBehavior",parentElement:this._bodyElement},null,null,this._element);
}if(this._popupVisible==false){this._popupVisible=true;
var d=$telerik.getBounds(this._element);
var a=this._element.style;
var c=a.left?parseInt(a.left):d.x;
var b=a.top?parseInt(a.top):d.y;
this._popupBehavior.set_x(c);
this._popupBehavior.set_y(b);
this._popupBehavior.show();
}}},hide:function(){this._element.className+=" RadUploadProgressAreaHidden";
if(this._popupBehavior){this._popupBehavior.hide(true);
}},updateTextIndicator:function(a,b){if(!a||typeof(b)=="undefined"){return;
}if(typeof(a.value)=="string"){a.value=b;
}else{if(typeof(a.innerHTML)=="string"){a.innerHTML=b;
}}},updateHorizontalProgressBar:function(a,b){if(a&&typeof(b)!="undefined"){a.style.width=b+"%";
}},updateVerticalProgressBar:function(a,b){if(a&&typeof(b)!="undefined"){a.style.height=b+"%";
}},get_progressManagerFound:function(){return this._progressManagerFound||!!Telerik.Web.UI.RadAsyncUpload;
},set_progressManagerFound:function(a){this._progressManagerFound=a;
},add_progressUpdating:function(a){this.get_events().addHandler("progressUpdating",a);
},remove_progressUpdating:function(a){this.get_events().removeHandler("progressUpdating",a);
},add_progressBarUpdating:function(a){this.get_events().addHandler("progressBarUpdating",a);
},remove_progressBarUpdating:function(a){this.get_events().removeHandler("progressBarUpdating",a);
}};
Telerik.Web.UI.RadProgressArea.registerClass("Telerik.Web.UI.RadProgressArea",Telerik.Web.UI.RadWebControl);
