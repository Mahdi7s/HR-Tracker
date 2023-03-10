Type.registerNamespace("Telerik.Web.UI.Scheduler.Views.Timeline");
(function(c,b,f,a){var e=60000;
var d=e*60;
var g=d*24;
a.ModelBase=function(h){this._owner=h;
this._settings=this._owner.get_timelineViewSettings()||{};
this._defaultHeaderDateFormat="d";
};
a.ModelBase.prototype={get_visibleRangeStart:function(){return b.add(this._owner.get_selectedDate(),this._getStartTime());
},get_visibleRangeEnd:function(){var h=new b(this.get_visibleRangeStart());
return h.add(this._getTimeViewDuration()).toDate();
},get_headerDateFormat:function(){if(!this._settings){return this._defaultHeaderDateFormat;
}return this._settings.headerDateFormat||this._defaultHeaderDateFormat;
},get_columnHeaderDateFormat:function(){return this._settings.columnHeaderDateFormat||"d";
},get_nextPeriodDate:function(){return new Date(this.get_visibleRangeEnd().getTime());
},get_previousPeriodDate:function(){var h=new b(this.get_visibleRangeStart());
return h.add(-this._getTimeViewDuration().get_ticks()).toDate();
},get_isAllDayAppointment:function(h){return((b.getTimeOfDay(h.get_start())==0)&&(h._isAllDay()));
},get_startOfMovedAppointment:function(h,l){var j;
var k=h.get_timeSlot().get_startTime();
if(k==0){j=l.get_startTime();
}else{var i=b.subtract(h.get_start(),k);
j=b.add(l.get_startTime(),i);
}return j;
},updateDraggingAppointmentSize:function(l,j,n){var o=j.parentNode;
var i=o.cells[o.cells.length-1];
var h=l.offsetLeft;
var k=i.offsetLeft+i.offsetWidth;
var m=k-j.offsetLeft-h;
l.style.width=Math.min(m,n)+"px";
},updateResizingAppointmentSize:function(m,k){var i=m.parentNode.parentNode;
var j=k.offsetLeft+k.offsetWidth;
var h=m.offsetLeft;
var l=Math.max(j-i.offsetLeft-h,i.offsetWidth-h);
m.style.width=l+"px";
},_getMaxAppointmentGrowth:function(){return this._getNumberOfSlots();
},_getNumberOfSlots:function(){return this._settings.numberOfSlots||3;
},_getTimeLabelSpan:function(){return this._settings.timeLabelSpan||1;
},_getSlotDuration:function(){return this._settings.slotDuration||g;
},_getStartTime:function(){return this._settings.startTime||0;
},isVisible:function(h){return h._isInRange(this.get_visibleRangeStart(),this.get_visibleRangeEnd());
},_getTimeViewDuration:function(){return new f(this._getNumberOfSlots()*this._getSlotDuration());
},get_supportsSlotSelection:function(){return false;
}};
a.ModelBase.registerClass("Telerik.Web.UI.Scheduler.Views.Timeline.ModelBase",null,Telerik.Web.UI.ISchedulerModel);
a.Model=function(h){a.Model.initializeBase(this,[h]);
this._slotDurationInMinutes=this._getSlotDuration()/e;
if(Telerik.Web.UI.Scheduler.Rendering.HorizontalBlockCollection){this._allDayBlocks=new Telerik.Web.UI.Scheduler.Rendering.HorizontalBlockCollection();
}};
a.Model.prototype={initialize:function(){},addToBlocks:function(h){this._allDayBlocks.add(h);
},removeFromBlock:function(h){this._allDayBlocks.remove(h);
},getTimeSlotFromDomElement:function(j){var i=this._getRawIndexFromDomElement(j);
var h=this._getTimeFromDomElement(j);
return new a.TimeSlot(i,h,this._slotDurationInMinutes,j);
},getDurationOfMovedAppointment:function(h){return h.get_duration();
},_getTimeFromDomElement:function(i){var h=this._getRawIndexFromDomElement(i);
return this._getTimeFromIndex(h);
},_getTimeFromIndex:function(h){var i=this.get_visibleRangeStart();
Telerik.Web.UI.RadScheduler._incrementTime(i,0,this._slotDurationInMinutes*h.intervalIndex);
return i;
},_getRawIndexFromDomElement:function(h){while(h&&(h.tagName.toUpperCase()!="TD")){h=h.parentNode;
}if(h){return{intervalIndex:h.cellIndex};
}return null;
},_getRawIndexFromStartTime:function(i){var h=b.subtract(new Date(i),this.get_visibleRangeStart());
return{intervalIndex:Math.max(0,Math.floor(h/this._getSlotDuration()))};
},_getAllDayTimeSlotForAppointmentPart:function(h){return this._getAllDayTimeSlotFromStartTime(h.start);
},_getAllDayTimeSlotFromStartTime:function(h){var i=this._getRawIndexFromStartTime(h);
var j=this._getDomElementFromRawIndex(i.intervalIndex);
return new a.TimeSlot({intervalIndex:i.intervalIndex},0,0,j);
},_getTimeSlotFromStartTime:function(h){var i=this._getRawIndexFromStartTime(h);
var j=this._getDomElementFromRawIndex(i.intervalIndex);
return this.getTimeSlotFromDomElement(j);
},getTimeSlotForAppointment:function(i){var h;
if(this.get_isAllDayAppointment(i)){h=this._getAllDayTimeSlotFromStartTime(i.get_start());
}else{h=this._getTimeSlotFromStartTime(i.get_start());
}return h;
},_getDomElementFromRawIndex:function(h){return c(".rsTimelineView .rsAllDayRow",this._owner.get_element()).children()[h];
},_getRenderer:function(){if(!this._renderer){this._renderer=new Telerik.Web.UI.Scheduler.Rendering.TimelineViewRenderer(this);
}return this._renderer;
}};
a.Model.registerClass("Telerik.Web.UI.Scheduler.Views.Timeline.Model",a.ModelBase);
a.TimeSlot=function(j,i,h,k){this._rawIndex=j;
this._startTime=i;
this._durationInMinutes=h;
this._domElement=k;
};
a.TimeSlot.prototype={get_index:function(){var h=this.get_rawIndex();
return String.format("{0}",h.intervalIndex);
},get_rawIndex:function(){return this._rawIndex;
},get_startTime:function(){return this._startTime;
},get_endTime:function(){return b.add(this.get_startTime(),this.get_duration());
},get_duration:function(){return this.get_durationInMinutes()*e;
},get_durationInMinutes:function(){return this._durationInMinutes;
},get_isAllDay:function(){return true;
},get_domElement:function(){return this._domElement;
}};
a.TimeSlot.registerClass("Telerik.Web.UI.Scheduler.Views.Timeline.TimeSlot",null,Telerik.Web.UI.ISchedulerTimeSlot);
})($telerik.$,Telerik.Web.UI.Scheduler.DateTime,Telerik.Web.UI.Scheduler.TimeSpan,Telerik.Web.UI.Scheduler.Views.Timeline);
