Type.registerNamespace("Telerik.Web.UI.Scheduler.Views.Timeline.GroupedByResource");
(function(){var d=$telerik.$,a,c=Telerik.Web.UI.Scheduler,b=c.Views.Timeline;
b.GroupedByResource.Model=function(e,f,g){b.GroupedByResource.Model.initializeBase(this,[e]);
this._groupingResource=f;
this._isVertical=g;
this._timelineModels=[];
this._resources=null;
if(Telerik.Web.UI.Scheduler.Rendering.HorizontalBlockCollection){this._allDayBlocks=new Telerik.Web.UI.Scheduler.Rendering.HorizontalBlockCollection();
}};
b.GroupedByResource.Model.prototype={initialize:function(){this._resources=this._owner.get_resources().getResourcesByType(this._groupingResource);
for(var e=0;
e<this._resources.get_count();
e++){this._timelineModels[e]=new b.Model(this._owner);
}},addToBlocks:function(e){var f=this._getAppointmentModelIndex(e.appointment);
e.appointment.__modelIndex=f;
this._timelineModels[f].addToBlocks(e);
},removeFromBlock:function(e){var f=e.appointment.__modelIndex;
this._timelineModels[f].removeFromBlock(e);
},getTimeSlotFromDomElement:function(i){var g=this._getRawIndexFromDomElement(i);
var f=this._getTimeFromDomElement(i);
var e=this._resources.getResource(g.modelIndex);
var h=this._timelineModels[0]._slotDurationInMinutes;
return new b.GroupedByResource.TimeSlot(g,f,h,e,i);
},getDurationOfMovedAppointment:function(e){return e.get_duration();
},_getMaxAppointmentGrowth:function(f){if(this._isVertical){return this._getNumberOfSlots();
}else{var e=this.getTimeSlotFromDomElement(f);
return(this._getNumberOfSlots()-e.get_rawIndex().intervalIndex-1);
}},_getTimeFromDomElement:function(f){var e=this._getRawIndexFromDomElement(f);
return this._timelineModels[0]._getTimeFromIndex(e);
},_getRawIndexFromDomElement:function(i){while(i&&(i.tagName.toUpperCase()!="TD")){i=i.parentNode;
}if(!i){return null;
}var e=i.parentNode;
if(!this._isVertical){var h=e.cells.length/this._resources.get_count();
var g=Math.floor(i.cellIndex/h);
var f=i.cellIndex-(g*h);
return{intervalIndex:f,modelIndex:g};
}else{return{intervalIndex:i.cellIndex,modelIndex:e.rowIndex};
}},_getRawIndexFromStartTime:function(e){return this._timelineModels[0]._getRawIndexFromStartTime(e);
},_getAppointmentModelIndex:function(e){var g=-1;
var f=this;
e.get_resources().forEach(function(h){var i=f._resources.getResourceByTypeAndKey(h.get_type(),h.get_key());
if(i){g=Array.indexOf(f._resources._array,i);
}});
return g;
},_getAllDayTimeSlotForAppointmentPart:function(e){return this._getAllDayTimeSlot(e.start,e.modelIndex);
},_getAllDayTimeSlot:function(f,i){var j=this._getRawIndexFromStartTime(f);
j.modelIndex=i;
var h=this._getDomElementFromRawIndex(j);
var g=this._resources.getResource(j.modelIndex);
var e=this._timelineModels[0]._slotDurationInMinutes;
return new b.GroupedByResource.TimeSlot(j,f,e,g,h);
},_getTimeSlotFromStartTime:function(h,g){var f=this._getRawIndexFromStartTime(h);
f.modelIndex=g;
var e=this._getDomElementFromRawIndex(f);
return this.getTimeSlotFromDomElement(e);
},getTimeSlotForAppointment:function(e){var g=this._getAppointmentModelIndex(e);
if(g==-1){return null;
}var f=(this.get_isAllDayAppointment(e))?this._getAllDayTimeSlot(e.get_start(),g):this._getTimeSlotFromStartTime(e.get_start(),g);
return f;
},_getDomElementFromRawIndex:function(f){if(f.modelIndex===a){return this._timelineModels[0]._getDomElementFromRawIndex(f.intervalIndex);
}var g=this._owner.get_element();
var e=f.modelIndex;
var h=f.intervalIndex;
if(this._isVertical){return d("div.rsTimelineView table.rsAllDayTable",g)[0].tBodies[0].rows[e].cells[h];
}h+=this._getNumberOfSlots()*f.modelIndex;
return d("div.rsTimelineView table.rsAllDayTable",g)[0].tBodies[0].rows[0].cells[h];
},isVisible:function(e){var f=b.GroupedByResource.Model.callBaseMethod(this,"isVisible",[e]);
var g=this._getAppointmentModelIndex(e)!=-1;
return f&&g;
},_getRenderer:function(){if(!this._renderer){this._renderer=new c.Rendering.ResourceGroupedTimelineViewRenderer(this);
}return this._renderer;
}};
b.GroupedByResource.Model.registerClass("Telerik.Web.UI.Scheduler.Views.Timeline.GroupedByResource.Model",b.ModelBase);
b.GroupedByResource.TimeSlot=function(g,f,h,e,i){this._resource=e;
b.GroupedByResource.TimeSlot.initializeBase(this,[g,f,h,i]);
};
b.GroupedByResource.TimeSlot.prototype={get_index:function(){var f=this.get_rawIndex();
var e=b.GroupedByResource.TimeSlot.callBaseMethod(this,"get_index");
return String.format("{0}:{1}",f.modelIndex,e);
},get_resource:function(){return this._resource;
}};
b.GroupedByResource.TimeSlot.registerClass("Telerik.Web.UI.Scheduler.Views.Timeline.GroupedByResource.TimeSlot",b.TimeSlot);
})();
