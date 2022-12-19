Type.registerNamespace("Telerik.Web.UI.Scheduler.Views.Month");
(function(d,a,h,b){var f=60000;
var e=f*60;
var i=e*24;
var g=i*7;
var c=h.DateTime;
b.ModelBase=function(j){this._owner=j;
this._settings=this._owner.get_monthViewSettings();
};
b.ModelBase.prototype={get_visibleRangeStart:function(){var k=this._owner.get_selectedDate();
var l=h.DateHelper.getFirstDayOfMonth(k);
var n=h.DateHelper.getStartOfWeek(l,this._owner.get_firstDayOfWeek());
var j=h.DateHelper.getEndOfWeek(n,this._owner.get_firstDayOfWeek(),this.get_weekLength());
var m;
if(j.getMonth()==k.getMonth()){m=n;
}else{m=h.DateTime.add(n,7*i);
}return m;
},get_visibleRangeEnd:function(){var j=h.DateHelper.getLastDayOfMonth(this._owner.get_selectedDate());
return h.DateHelper.getEndOfWeek(j,this._owner.get_firstDayOfWeek(),this.get_weekLength());
},get_nextPeriodDate:function(){var j=this._owner.get_selectedDate();
return new Date(j.getFullYear(),j.getMonth(),32);
},get_previousPeriodDate:function(){var j=this._owner.get_selectedDate();
return new Date(j.getFullYear(),j.getMonth(),0);
},get_weekLength:function(){return h.DateHelper.getWeekLength(this._owner.get_selectedDate(),this._owner.get_firstDayOfWeek(),this._owner.get_lastDayOfWeek());
},get_headerDateFormat:function(){return this._settings.headerDateFormat||"MMM, yyyy";
},get_dayHeaderDateFormat:function(){return this._settings.dayHeaderDateFormat||"dd";
},get_firstDayHeaderDateFormat:function(){return this._settings.firstDayHeaderDateFormat||"dd MMM";
},get_visibleAppointmentsPerDay:function(){return this._settings.visibleAppointmentsPerDay||2;
},get_startOfMovedAppointment:function(j,k){return c.add(k.get_startTime(),c.getTimeOfDay(j.get_start()));
},getDurationOfMovedAppointment:function(j){return j.get_duration();
},_areTimeSlotsInAscendingOrder:function(j,k){return j.get_rawIndex().dayIndex<k.get_rawIndex().dayIndex;
},_getTimeSlotIndices:function(k){var n=h.DateTime.subtract(k,this.get_visibleRangeStart());
var j=Math.floor(n/g);
var m=n-(j*g);
var l=Math.floor(m/i);
return{dayIndex:(this.get_weekLength()*j)+l};
},_getContentTable:function(){if(!this._contentTable){this._contentTable=d("div.rsTopWrap table.rsContentTable",this._owner.get_element())[0];
}return this._contentTable;
},isVisible:function(j){return j._isInRange(this.get_visibleRangeStart(),this.get_visibleRangeEnd());
},get_supportsSlotSelection:function(){return true;
},getTimeSlotsBetween:function(j,m){if(!(j&&m)){return[];
}var p=j.get_rawIndex();
var n=m.get_rawIndex();
if(p.dayIndex==n.dayIndex){return[j];
}if(!this._areTimeSlotsInAscendingOrder(j,m)){var l=j;
j=m;
m=l;
p=j.get_rawIndex();
n=m.get_rawIndex();
}var o=[j];
var r=n.dayIndex-p.dayIndex;
var q=j;
for(var k=0;
k<r;
k++){q=this._getNextTimeSlot(q);
if(q){o.push(q);
}}return o;
},_getNextTimeSlot:function(l){var m={dayIndex:l.get_rawIndex().dayIndex+1};
var k=this._getTimeSlotDomElement(m);
var j=this._getTimeFromIndex(m);
return this._createTimeSlot(m,j,k);
},_createTimeSlot:function(k,j,l){return new b.TimeSlot(k,j,l);
},_processRowSelection:function(l,r){var o=this._owner._rowSelectionState;
var n=o.rowSelectionEndSlot;
var p=this.getTimeSlotFromDomElement(l);
var k=p.get_rawIndex();
var j=(n)?true:false;
var q=true;
if(j){var m=n.get_rawIndex();
q=k.dayIndex==m.dayIndex;
}if(!(j&&q)){o.rowSelectionEndSlot=p;
r.apply(this._owner);
}}};
b.ModelBase.registerClass("Telerik.Web.UI.Scheduler.Views.Month.ModelBase");
b.Model=function(j){if(h.Rendering.HorizontalBlockCollection){this._allDayBlocks=new h.Rendering.HorizontalBlockCollection();
}b.Model.initializeBase(this,[j]);
};
b.Model.prototype={initialize:function(){},addToBlocks:function(j){this._allDayBlocks.add(j);
},removeFromBlock:function(j){this._allDayBlocks.remove(j);
},getTimeSlotFromDomElement:function(l){var k=this._getRawIndexFromDomElement(l);
var j=this._getTimeFromDomElement(l);
return new b.TimeSlot(k,j,l);
},_getTimeFromDomElement:function(k){var j=this._getRawIndexFromDomElement(k);
return this._getTimeFromIndex(j);
},_getTimeFromIndex:function(o){var m=this.get_visibleRangeStart();
var l=this.get_weekLength();
var n=Math.floor(o.dayIndex/l);
var j=o.dayIndex%l;
var k=(n*7)+j;
a.RadScheduler._incrementTime(m,24*k,0);
return m;
},_getRawIndexFromDomElement:function(n){while(n&&(n.tagName.toUpperCase()!="TD")){n=n.parentNode;
}if(n){var j=n.parentNode;
var k=j.cells.length;
var m=n.cellIndex;
var l=j.rowIndex;
return{dayIndex:(k*l)+m};
}return null;
},getTimeSlotForAppointment:function(j){return this._getAllDayTimeSlotFromStartTime(j.get_start());
},_getAllDayTimeSlotForAppointmentPart:function(j){return this._getAllDayTimeSlotFromStartTime(j.start);
},_getAllDayTimeSlotFromStartTime:function(j){var k=this._getTimeSlotIndices(j);
var l=this._getTimeSlotDomElement(k);
return new b.TimeSlot(k,null,l);
},_getTimeSlotDomElement:function(k){var l=this._owner.get_element();
var j=Math.floor(k.dayIndex/this.get_weekLength());
var m=Math.floor(k.dayIndex%this.get_weekLength());
return d("div.rsTopWrap table.rsContentTable",l)[0].tBodies[0].rows[j].cells[m];
},_getRenderer:function(){if(!this._renderer){this._renderer=new a.Scheduler.Rendering.MonthViewRenderer(this);
}return this._renderer;
}};
b.Model.registerClass("Telerik.Web.UI.Scheduler.Views.Month.Model",b.ModelBase);
b.TimeSlot=function(k,j,l){this._rawIndex=k;
this._startTime=j;
this._domElement=l;
};
b.TimeSlot.prototype={set_selected:function(k){var j=this.get_domElement();
if(j){d(j).toggleClass("rsSelectedSlot",k);
}this._selected=k;
},get_index:function(){var j=this.get_rawIndex();
return String.format("{0}",j.dayIndex);
},get_rawIndex:function(){return this._rawIndex;
},get_startTime:function(){return this._startTime;
},get_endTime:function(){return h.DateTime.add(this.get_startTime(),this.get_duration());
},get_duration:function(){return this.get_durationInMinutes()*f;
},get_durationInMinutes:function(){return 1440;
},get_isAllDay:function(){return true;
},get_domElement:function(){if(d(this._domElement).is("td")){return this._domElement;
}else{return d(this._domElement).parents("td:first")[0];
}}};
b.TimeSlot.registerClass("Telerik.Web.UI.Scheduler.Views.Month.TimeSlot",null,a.ISchedulerTimeSlot);
})($telerik.$,Telerik.Web.UI,Telerik.Web.UI.Scheduler,Telerik.Web.UI.Scheduler.Views.Month);