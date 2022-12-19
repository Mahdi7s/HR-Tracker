Type.registerNamespace("Telerik.Web.UI");
$telerik.findSchedulerRecurrenceEditor=$find;
$telerik.toSchedulerRecurrenceEditor=function(a){return a;
};
(function(){var c=$telerik.$,a=Telerik.Web.UI,e=a.Scheduler.DateTime,g=2147483647,d=new Date("9000/01/01"),f=10000,b="";
a.RecurrenceEditor=function(h){a.RecurrenceEditor.initializeBase(this,[h]);
this._recurrenceRule=null;
this._startDate=new Date("2000/01/01");
this._endDate=new Date("2000/01/02");
this._firstDayOfWeek=a.DayOfWeek.Sunday;
this._baseId=this.get_id();
};
a.RecurrenceEditor.prototype={initialize:function(){a.RecurrenceEditor.callBaseMethod(this,"initialize");
this._initializeRecurrenceCheckbox();
this._initializeRecurrenceRadioButtons();
this._initializeLinkedRecurrenceControls();
this._initializeDatePicker();
},dispose:function(){a.RecurrenceEditor.callBaseMethod(this,"dispose");
},set_recurrenceRule:function(h){this._recurrenceRule=h;
this._populate(h);
},get_recurrenceRule:function(){if(!this._getRecurrentCheckBox().checked){return null;
}return this._saveRecurrenceRule();
},set_startDate:function(h){this._startDate=h;
},get_startDate:function(){return this._startDate;
},set_endDate:function(h){this._endDate=h;
},get_endDate:function(){return this._endDate;
},set_firstDayOfWeek:function(h){this._firstDayOfWeek=h;
},get_firstDayOfWeek:function(){return this._firstDayOfWeek;
},_initializeRecurrenceCheckbox:function(){var i=this._baseId;
var h=c($get(i+"_RecurrencePanel"));
var j=c($get(i+"_RecurrentAppointment"));
if(j[0].checked){h.show();
}j.click(function(){var k=h.parents(".rsAdvancedModal");
var l={duration:"slow"};
if($telerik.isIE6||$telerik.quirksMode){l={duration:"slow",step:function(){if(k.length){k[0].style.cssText=k[0].style.cssText;
}}};
}h.stop(false,true).animate({height:"toggle"},l);
});
},_initializeRecurrenceRadioButtons:function(){var l=this._baseId;
var j=[$get(l+"_RepeatFrequencyHourly"),$get(l+"_RepeatFrequencyDaily"),$get(l+"_RepeatFrequencyWeekly"),$get(l+"_RepeatFrequencyMonthly"),$get(l+"_RepeatFrequencyYearly")];
var o=c(".rsAdvPatternPanel",$get(l+"_RecurrencePatternPanel"));
var n=function(i){var p=i.value.replace("RepeatFrequency","RecurrencePattern")+"Panel";
return o.filter("[id$='"+p+"']");
};
for(var h=0,m=j.length;
h<m;
h++){var k=j[h];
if(k.checked){n(k).show();
}c(k).click(function(){var i=c(n(this));
if(i.css("display")=="none"){o.hide();
i.show();
}});
}},_initializeLinkedRecurrenceControls:function(){var i={};
var h=this._baseId;
i[h+"_RepeatEveryNthDay"]=[c($get(h+"_DailyRepeatInterval")),c($get(h+"_DailyRepeatInterval_SpinUpButton")),c($get(h+"_DailyRepeatInterval_SpinDownButton"))];
i[h+"_RepeatEveryNthMonthOnDate"]=[c($get(h+"_MonthlyRepeatDate")),c($get(h+"_MonthlyRepeatDate_SpinUpButton")),c($get(h+"_MonthlyRepeatDate_SpinDownButton")),c($get(h+"_MonthlyRepeatIntervalForDate")),c($get(h+"_MonthlyRepeatIntervalForDate_SpinUpButton")),c($get(h+"_MonthlyRepeatIntervalForDate_SpinDownButton"))];
i[h+"_RepeatEveryNthMonthOnGivenDay"]=[c($get(h+"_MonthlyDayOrdinalDropDown_Input")),c($get(h+"_MonthlyDayMaskDropDown_Input")),c($get(h+"_MonthlyRepeatIntervalForGivenDay")),c($get(h+"_MonthlyRepeatIntervalForGivenDay_SpinUpButton")),c($get(h+"_MonthlyRepeatIntervalForGivenDay_SpinDownButton"))];
i[h+"_RepeatEveryYearOnDate"]=[c($get(h+"_YearlyRepeatMonthForDate_Input")),c($get(h+"_YearlyRepeatDate")),c($get(h+"_YearlyRepeatDate_SpinUpButton")),c($get(h+"_YearlyRepeatDate_SpinDownButton"))];
i[h+"_RepeatEveryYearOnGivenDay"]=[c($get(h+"_YearlyDayOrdinalDropDown_Input")),c($get(h+"_YearlyDayMaskDropDown_Input")),c($get(h+"_YearlyRepeatMonthForGivenDay_Input"))];
i[h+"_RepeatGivenOccurrences"]=[c($get(h+"_RangeOccurrences")),c($get(h+"_RangeOccurrences_SpinUpButton")),c($get(h+"_RangeOccurrences_SpinDownButton"))];
i[h+"_RepeatUntilGivenDate"]=[c($get(h+"_RangeEndDate_dateInput_text"))];
c.each(i,function(j){var l=c($get(j));
var k=i[j][0];
l.click(function(){if(k.css("visibility")=="hidden"){var m=c("#"+k[0].id+"_text");
if(m){m.focus();
}}else{k.focus();
}});
c.each(i[j],function(){c(this).focus(function(){l[0].checked=true;
});
});
});
},_initializeDatePicker:function(){var h=this._baseId;
c($get(h+"_RangeEndDate_dateInput_text")).bind("focus",function(){window.setTimeout(function(){$find(h+"_RangeEndDate").showPopup();
},0);
});
},_saveRecurrenceRule:function(){return a.RecurrenceRule.fromPatternAndRange(this._getPattern(),this._getRange());
},_populate:function(i){var l=i!=null;
this._getRecurrentCheckBox().checked=l;
var k=c(this._getElement("RecurrencePanel"));
if(!l){if(k.length>0){k.hide();
this._prefillRecurrenceControls();
}return;
}var h=i.get_pattern();
var m=h.get_interval().toString();
var j=h.get_daysOfWeekMask();
switch(h.get_frequency()){case a.RecurrenceFrequency.Hourly:c(this._getElement("RepeatFrequencyHourly")).trigger("click");
this._getControl("HourlyRepeatInterval").set_value(m);
break;
case a.RecurrenceFrequency.Daily:c(this._getElement("RepeatFrequencyDaily")).trigger("click");
if(h.get_daysOfWeekMask()==a.RecurrenceDay.WeekDays){this._getElement("RepeatEveryWeekday").checked=true;
this._getElement("RepeatEveryNthDay").checked=false;
}else{this._getElement("RepeatEveryWeekday").checked=false;
this._getElement("RepeatEveryNthDay").checked=true;
this._getControl("DailyRepeatInterval").set_value(m);
}break;
case a.RecurrenceFrequency.Weekly:c(this._getElement("RepeatFrequencyWeekly")).trigger("click");
this._getControl("WeeklyRepeatInterval").set_value(m);
this._getElement("WeeklyWeekDayMonday").checked=(a.RecurrenceDay.Monday&j)==a.RecurrenceDay.Monday;
this._getElement("WeeklyWeekDayTuesday").checked=(a.RecurrenceDay.Tuesday&j)==a.RecurrenceDay.Tuesday;
this._getElement("WeeklyWeekDayWednesday").checked=(a.RecurrenceDay.Wednesday&j)==a.RecurrenceDay.Wednesday;
this._getElement("WeeklyWeekDayThursday").checked=(a.RecurrenceDay.Thursday&j)==a.RecurrenceDay.Thursday;
this._getElement("WeeklyWeekDayFriday").checked=(a.RecurrenceDay.Friday&j)==a.RecurrenceDay.Friday;
this._getElement("WeeklyWeekDaySaturday").checked=(a.RecurrenceDay.Saturday&j)==a.RecurrenceDay.Saturday;
this._getElement("WeeklyWeekDaySunday").checked=(a.RecurrenceDay.Sunday&j)==a.RecurrenceDay.Sunday;
break;
case a.RecurrenceFrequency.Monthly:c(this._getElement("RepeatFrequencyMonthly")).trigger("click");
if(0<h.get_dayOfMonth()){this._getElement("RepeatEveryNthMonthOnDate").checked=true;
this._getElement("RepeatEveryNthMonthOnGivenDay").checked=false;
this._getControl("MonthlyRepeatDate").set_value(h.get_dayOfMonth());
this._getControl("MonthlyRepeatIntervalForDate").set_value(m);
}else{this._getElement("RepeatEveryNthMonthOnDate").checked=false;
this._getElement("RepeatEveryNthMonthOnGivenDay").checked=true;
this._selectDropDownValue(this._getElement("MonthlyDayOrdinalDropDown"),h.get_dayOrdinal());
this._selectDropDownValue(this._getElement("MonthlyDayMaskDropDown"),j.toString());
this._getControl("MonthlyRepeatIntervalForGivenDay").set_value(m);
}break;
case a.RecurrenceFrequency.Yearly:c(this._getElement("RepeatFrequencyYearly")).trigger("click");
if(0<h.get_dayOfMonth()){this._getElement("RepeatEveryYearOnDate").checked=true;
this._getElement("RepeatEveryYearOnGivenDay").checked=false;
this._getControl("YearlyRepeatDate").set_value(h.get_dayOfMonth());
this._selectDropDownValue(this._getElement("YearlyRepeatMonthForDate"),a.RecurrenceMonth.toString(h.get_month()));
}else{this._getElement("RepeatEveryYearOnDate").checked=false;
this._getElement("RepeatEveryYearOnGivenDay").checked=true;
this._selectDropDownValue(this._getElement("YearlyDayOrdinalDropDown"),h.get_dayOrdinal());
this._selectDropDownValue(this._getElement("YearlyDayMaskDropDown"),j.toString());
this._selectDropDownValue(this._getElement("YearlyRepeatMonthForGivenDay"),a.RecurrenceMonth.toString(h.get_month()));
}break;
}this._populateRecurrenceRange(i.get_range());
k.show();
},_prefillRecurrenceControls:function(){var k=this.get_startDate();
var h=k.getDay();
this._getElement("WeeklyWeekDaySunday").checked=h==a.DayOfWeek.Sunday;
this._getElement("WeeklyWeekDayMonday").checked=h==a.DayOfWeek.Monday;
this._getElement("WeeklyWeekDayTuesday").checked=h==a.DayOfWeek.Tuesday;
this._getElement("WeeklyWeekDayWednesday").checked=h==a.DayOfWeek.Wednesday;
this._getElement("WeeklyWeekDayThursday").checked=h==a.DayOfWeek.Thursday;
this._getElement("WeeklyWeekDayFriday").checked=h==a.DayOfWeek.Friday;
this._getElement("WeeklyWeekDaySaturday").checked=h==a.DayOfWeek.Saturday;
var i=k.getDate();
this._getControl("MonthlyRepeatDate").set_value(i);
var j=k.getMonth()+1;
this._selectDropDownValue(this._getElement("YearlyRepeatMonthForDate"),a.RecurrenceMonth.toString(j));
this._getControl("YearlyRepeatDate").set_value(i);
this._selectDropDownValue(this._getElement("YearlyRepeatMonthForGivenDay"),a.RecurrenceMonth.toString(j));
},_populateRecurrenceRange:function(i){var j=i.get_maxOccurrences()!=g;
var h=i.get_recursUntil().getTime()!=d.getTime();
if(!j&&!h){this._getElement("RepeatIndefinitely").checked=true;
this._getElement("RepeatGivenOccurrences").checked=false;
this._getElement("RepeatUntilGivenDate").checked=false;
}else{if(j){this._getElement("RepeatIndefinitely").checked=false;
this._getElement("RepeatGivenOccurrences").checked=true;
this._getElement("RepeatUntilGivenDate").checked=false;
this._getControl("RangeOccurrences").set_value(i.get_maxOccurrences());
}else{this._getElement("RepeatIndefinitely").checked=false;
this._getElement("RepeatGivenOccurrences").checked=false;
this._getElement("RepeatUntilGivenDate").checked=true;
this._getControl("RangeEndDate").set_selectedDate(i.get_recursUntil());
}}},_selectDropDownValue:function(h,i){var j=$find(h.id);
if(j&&a.RadComboBox.isInstanceOfType(j)){j.get_items().forEach(function(k){if(k.get_value()==i){k.select();
}});
}else{c.each(h.options,function(){if(this.value==i){this.selected=true;
return false;
}});
}},_getFrequency:function(){if(!this._getRecurrentCheckBox().checked){return a.RecurrenceFrequency.None;
}if(this._getElement("RepeatFrequencyHourly").checked){return a.RecurrenceFrequency.Hourly;
}if(this._getElement("RepeatFrequencyDaily").checked){return a.RecurrenceFrequency.Daily;
}if(this._getElement("RepeatFrequencyWeekly").checked){return a.RecurrenceFrequency.Weekly;
}if(this._getElement("RepeatFrequencyMonthly").checked){return a.RecurrenceFrequency.Monthly;
}if(this._getElement("RepeatFrequencyYearly").checked){return a.RecurrenceFrequency.Yearly;
}return a.RecurrenceFrequency.None;
},_getInterval:function(){switch(this._getFrequency()){case a.RecurrenceFrequency.Hourly:return parseInt(this._getElement("HourlyRepeatInterval").value,10);
case a.RecurrenceFrequency.Daily:if(this._getElement("RepeatEveryNthDay").checked){return parseInt(this._getElement("DailyRepeatInterval").value,10);
}break;
case a.RecurrenceFrequency.Weekly:return parseInt(this._getElement("WeeklyRepeatInterval").value,10);
case a.RecurrenceFrequency.Monthly:if(this._getElement("RepeatEveryNthMonthOnDate").checked){return parseInt(this._getElement("MonthlyRepeatIntervalForDate").value,10);
}else{return parseInt(this._getElement("MonthlyRepeatIntervalForGivenDay").value,10);
}}return 0;
},_getDaysOfWeekMask:function(){switch(this._getFrequency()){case a.RecurrenceFrequency.Daily:return this._getElement("RepeatEveryWeekday").checked?a.RecurrenceDay.WeekDays:a.RecurrenceDay.EveryDay;
case a.RecurrenceFrequency.Weekly:var h=a.RecurrenceDay.None;
h|=this._getElement("WeeklyWeekDayMonday").checked?a.RecurrenceDay.Monday:h;
h|=this._getElement("WeeklyWeekDayTuesday").checked?a.RecurrenceDay.Tuesday:h;
h|=this._getElement("WeeklyWeekDayWednesday").checked?a.RecurrenceDay.Wednesday:h;
h|=this._getElement("WeeklyWeekDayThursday").checked?a.RecurrenceDay.Thursday:h;
h|=this._getElement("WeeklyWeekDayFriday").checked?a.RecurrenceDay.Friday:h;
h|=this._getElement("WeeklyWeekDaySaturday").checked?a.RecurrenceDay.Saturday:h;
h|=this._getElement("WeeklyWeekDaySunday").checked?a.RecurrenceDay.Sunday:h;
return h;
break;
case a.RecurrenceFrequency.Monthly:if(this._getElement("RepeatEveryNthMonthOnGivenDay").checked){return parseInt(this._getControl("MonthlyDayMaskDropDown").get_value(),10);
}break;
case a.RecurrenceFrequency.Yearly:if(this._getElement("RepeatEveryYearOnGivenDay").checked){return parseInt(this._getControl("YearlyDayMaskDropDown").get_value(),10);
}break;
}return a.RecurrenceDay.None;
},_getDayOfMonth:function(){switch(this._getFrequency()){case a.RecurrenceFrequency.Monthly:return this._getElement("RepeatEveryNthMonthOnDate").checked?parseInt(this._getElement("MonthlyRepeatDate").value,10):0;
case a.RecurrenceFrequency.Yearly:return this._getElement("RepeatEveryYearOnDate").checked?parseInt(this._getElement("YearlyRepeatDate").value,10):0;
}return 0;
},_getDayOrdinal:function(){switch(this._getFrequency()){case a.RecurrenceFrequency.Monthly:if(this._getElement("RepeatEveryNthMonthOnGivenDay").checked){return parseInt(this._getControl("MonthlyDayOrdinalDropDown",10).get_value());
}break;
case a.RecurrenceFrequency.Yearly:if(this._getElement("RepeatEveryYearOnGivenDay").checked){return parseInt(this._getControl("YearlyDayOrdinalDropDown",10).get_value());
}break;
}return 0;
},_getMonth:function(){if(this._getFrequency()!=a.RecurrenceFrequency.Yearly){return a.RecurrenceMonth.None;
}var h;
if(this._getElement("RepeatEveryYearOnDate").checked){h=this._getControl("YearlyRepeatMonthForDate").get_value();
}else{h=this._getControl("YearlyRepeatMonthForGivenDay").get_value();
}return a.RecurrenceMonth.parse(h,true);
},_getPattern:function(){if(!this._getRecurrentCheckBox()||!this._getRecurrentCheckBox().checked){return null;
}var h=new a.RecurrencePattern();
h.set_frequency(this._getFrequency());
h.set_interval(this._getInterval());
h.set_daysOfWeekMask(this._getDaysOfWeekMask());
h.set_dayOfMonth(this._getDayOfMonth());
h.set_dayOrdinal(this._getDayOrdinal());
h.set_month(this._getMonth());
if(h.get_frequency()==a.RecurrenceFrequency.Weekly){h.set_firstDayOfWeek(this.get_firstDayOfWeek());
}return h;
},_getRange:function(){if(!this._getRecurrentCheckBox()||!this._getRecurrentCheckBox().checked){return null;
}var h=this.get_startDate();
var k=this.get_endDate();
var j=new a.RecurrenceRange();
j.set_start(h);
j.set_eventDuration(e.subtract(k,h));
j.set_maxOccurrences(0);
j.set_recursUntil(d);
if(this._getElement("RepeatGivenOccurrences").checked){var i=parseInt(this._getElement("RangeOccurrences").value,10);
if(!isNaN(i)){j.set_maxOccurrences(i);
}}var l=this._getControl("RangeEndDate");
if(this._getElement("RepeatUntilGivenDate").checked&&!l.isEmpty()){j.set_recursUntil(l.get_selectedDate());
}return j;
},_selectDropDownValue:function(h,i){var j=$find(h.id);
if(j&&a.RadComboBox.isInstanceOfType(j)){j.get_items().forEach(function(k){if(k.get_value()==i){k.select();
}});
}else{c.each(h.options,function(){if(this.value==i){this.selected=true;
return false;
}});
}},_getElement:function(h){return $get(this._baseId+"_"+h);
},_getControl:function(h){return $find(this._baseId+"_"+h);
},_getRecurrentCheckBox:function(){return this._getElement("RecurrentAppointment");
}};
a.RecurrenceEditor.registerClass("Telerik.Web.UI.RecurrenceEditor",a.RadWebControl);
a.RadSchedulerRecurrenceEditor=a.RecurrenceEditor;
})();
