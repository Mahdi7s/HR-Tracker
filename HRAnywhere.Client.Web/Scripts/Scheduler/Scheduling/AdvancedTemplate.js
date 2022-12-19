Type.registerNamespace("Telerik.Web.UI.Scheduling");
(function(){var e=$telerik.$,b=Telerik.Web.UI,d=b.Scheduler.DateTime,g=60000,a=g*60,i=a*24,j=2147483647,f=new Date("9000/01/01"),h=10000,c="";
Telerik.Web.UI.Scheduling.AdvancedTemplate=function(o,m,k){this._scheduler=$find(o.id);
this._schedulerElement=o;
this._formElement=m;
this._schedulerElementId=this._schedulerElement.id;
this._isModal=k;
this._eventNamespace=o.id;
var n=e("div.rsAdvBasicControls",m);
if(n.length==0){return;
}var l=n[0].id;
this._templateId=l.substring(0,l.lastIndexOf("_"));
};
Telerik.Web.UI.Scheduling.AdvancedTemplate._adjustHeight=function(l){var k=e("div.rsAdvancedEdit:visible",l);
var m=e(".rsAdvContentWrapper",k);
var r=k.outerHeight()-k.height();
r+=m.outerHeight()-m.height();
var o=e("div.rsAdvTitle:visible",l).outerHeight({margin:true});
var p=e("div.rsAdvancedSubmitArea",k);
var q=p.outerHeight({margin:true});
var n=e(l).height()-o-q-r;
e(".rsAdvOptionsScroll",k).height(n+"px");
if(p[0]){p[0].style.cssText=p[0].style.cssText;
}};
Telerik.Web.UI.Scheduling.AdvancedTemplate.prototype={initialize:function(){var k=this._scheduler;
k.add_disposing(Function.createDelegate(this,this.dispose));
e("div.rsAdvancedSubmitArea a",this._formElement).attr("onclick","");
if(k.get_overflowBehavior()==1&&!this._isModal){Telerik.Web.UI.Scheduling.AdvancedTemplate._adjustHeight(this._schedulerElement);
}this._initializePickers();
this._initializeAdvancedFormValidators();
this._initializeAllDayCheckbox();
var m=this._getRecurrenceEditor()!=null;
if(m){this._initializeResetExceptions();
}if($telerik.isIE){var l=this._getSubjectTextBox().get_element();
l.style.cssText=l.style.cssText;
}e(".riUp, .riDown",this._formElement).attr("tabindex","-1");
},dispose:function(){if(!this._formElement){return;
}e("*",this._formElement).unbind();
e(document).unbind("."+this._eventNamespace);
this._pickers=null;
this._scheduler=null;
this._schedulerElement=null;
this._formElement=null;
},populate:function(k,n){if(!this._clientMode){this._initializeClientMode();
}this._appointment=k;
this._isInsert=n;
var m=this._isAllDayAppointment(k);
var o=d.getDate(k.get_end());
if(m){o=d.add(o,-i);
}this._getSubjectTextBox().set_value(k.get_subject());
var l=this._getDescriptionTextBox();
if(l){l.set_value(k.get_description());
}this._pickers.startDate.set_selectedDate(d.getDate(k.get_start()));
this._pickers.startTime.set_selectedDate(k.get_start());
this._pickers.endDate.set_selectedDate(o);
this._pickers.endTime.set_selectedDate(k.get_end());
this._populateResources();
this._populateAttributes();
this._initalizeResetExceptionsClientMode();
var p=e("#"+this._templateId+"_AllDayEvent");
if(m!=p[0].checked){p[0].checked=m;
this._onAllDayCheckBoxClick(m,false);
}this._populateRecurrence();
this._populateReminder();
},_isAllDayAppointment:function(k){return d.getTimeOfDay(k.get_start())==0&&d.getTimeOfDay(k.get_end())==0&&!(d.areEqual(k.get_start(),k.get_end()));
},_initializeClientMode:function(){this._clientMode=true;
var k=this;
e("a.rsAdvEditSave",this._formElement).click(function(l){k._saveClicked();
$telerik.cancelRawEvent(l);
}).attr("href","#");
e("a.rsAdvEditCancel, a.rsAdvEditClose",this._formElement).click(function(l){k._cancelClicked();
$telerik.cancelRawEvent(l);
}).attr("href","#");
},_initalizeResetExceptionsClientMode:function(){var k=e("span.rsAdvResetExceptions > a",this._formElement);
var n=this._appointment.get_recurrenceRule().indexOf("EXDATE")!=-1;
k.unbind();
if(n){var l=this;
var m=this._scheduler.get_localization();
k.attr("href","#").text(m.AdvancedReset).click(function(){l._getRemoveExceptionsDialog().set_onActionConfirm(function(){l._scheduler.removeRecurrenceExceptions(l._appointment);
k.text(m.AdvancedDone);
}).show();
return false;
});
}else{k.text("");
}},_saveClicked:function(){if(typeof(Page_ClientValidate)!="undefined"){var r=this._scheduler.get_validationGroup()+(this._isInsert?"Insert":"Edit");
if(!Page_ClientValidate(r)){return;
}}var k=this._appointment;
k.set_subject(this._getSubjectTextBox().get_value());
var l=this._getDescriptionTextBox();
if(l){k.set_description(l.get_value());
}var m=$get(this._templateId+"_AllDayEvent").checked;
var n=this._pickers.startDate.get_selectedDate();
var q=d.getTimeOfDay(this._pickers.startTime.get_selectedDate());
k.set_start(d.add(n,m?0:q));
var p=this._pickers.endDate.get_selectedDate();
var o=d.getTimeOfDay(this._pickers.endTime.get_selectedDate());
k.set_end(d.add(p,m?i:o));
this._saveResources(k);
this._saveAttributes(k);
this._saveRecurrenceRule(k);
this._saveReminder(k);
if(this._isInsert){this._scheduler.insertAppointment(k);
}else{this._scheduler.updateAppointment(k);
}this._scheduler.hideAdvancedForm();
},_cancelClicked:function(){this._scheduler.hideAdvancedForm();
},_saveResources:function(m){var l=this;
var k=this._scheduler.get_resources();
this._scheduler.get_resourceTypes().forEach(function(t){var u=t.get_name();
var q=l._templateId+"_Res"+u+c;
var r=k.getResourcesByType(u);
if(t.get_allowMultipleValues()){var p=e(String.format("input[id*='{0}']",q),this._formElement);
if(p.length>0){m.get_resources().removeResourcesByType(u);
}for(var n=0;
n<p.length;
n++){if(p[n].checked&&r.get_count()>=n){m.get_resources().add(r.getResource(n));
}}}else{var s=$find(q);
if(!s){return;
}m.get_resources().removeResourcesByType(u);
if(s.get_selectedIndex()==0){return;
}var v=s.get_selectedItem().get_value();
var o=k.findAll(function(w){return w.get_type()==u&&w._getInternalKey()==v;
}).getResource(0)||null;
if(o){m.get_resources().add(o);
}}});
},_saveAttributes:function(m){var k=this;
var l=m.get_attributes();
e.each(this._scheduler.get_customAttributeNames(),function(){var n=this.toString();
var o=$find(k._templateId+"_Attr"+n);
if(!o){return;
}l.removeAttribute(n);
l.setAttribute(n,o.get_value());
});
},_getResourceIndex:function(l){var n=this._scheduler.get_resources().getResourcesByType(l.get_type());
var m,k;
for(m=0,k=n.get_count();
m<k;
m++){var o=n.getResource(m);
if(o.get_type()==l.get_type()&&o.get_key()==l.get_key()){return m;
}}return -1;
},_populateResources:function(){var k=this;
var l=this._scheduler.get_resourceTypes();
l.forEach(function(o){var n=k._templateId+"_Res"+o.get_name()+c;
if(o.get_allowMultipleValues()){e(String.format("input[id*='{0}']",n),this._formElement).each(function(){this.checked=false;
});
}else{var m=$find(n);
if(m){m.get_items().getItem(0).select();
}}});
this._appointment.get_resources().forEach(function(p){var q=k._templateId+"_Res"+p.get_type()+c;
var m=l.getResourceTypeByName(p.get_type());
if(m&&m.get_allowMultipleValues()){var o=k._getResourceIndex(p);
var r=$get(q+"_"+o);
if(r){r.checked=true;
}}else{var n=$get(q);
if(n){k._selectDropDownValue(n,p._getInternalKey());
}}});
},_populateAttributes:function(){var k=this;
this._appointment.get_attributes().forEach(function(m,l){var n=$find(k._templateId+"_Attr"+m);
if(!n){return;
}n.set_value(l);
});
},_saveRecurrenceRule:function(o){var l=this._getRecurrenceEditor();
if(!l){return;
}l.set_startDate(this._scheduler.displayToUtc(o.get_start()));
l.set_endDate(this._scheduler.displayToUtc(o.get_end()));
l.set_firstDayOfWeek(this._scheduler.get_firstDayOfWeek());
var k=l.get_recurrenceRule();
if(!k){o.set_recurrenceRule("");
return;
}var p=b.RecurrenceRule.parse(o.get_recurrenceRule());
if(p){Array.addRange(k.get_exceptions(),p.get_exceptions());
}var n=k.get_range();
if(n.get_recursUntil().getTime()!=f.getTime()){var m=this._scheduler.displayToUtc(n.get_recursUntil());
if(!this._getElement("AllDayEvent").checked){m=d.add(m,i);
}n.set_recursUntil(m);
}o.set_recurrenceRule(k.toString());
},_saveReminder:function(l){var n=this._getReminderDropDown();
if(!n){return;
}var p=n.get_value();
var k=l.get_reminders();
if(p){var o=parseInt(p,10);
if(k.get_count()>0){k.getReminder(0).set_trigger(o);
}else{var m=new b.Reminder();
m.set_trigger(o);
k.add(m);
}}else{if(k.get_count()>0){k.removeAt(0);
}}},_populateRecurrence:function(){var m=this._getRecurrenceEditor();
if(!m){return;
}var k=b.RecurrenceRule.parse(this._appointment.get_recurrenceRule());
if(k){var l=k.get_range();
var n=l.get_recursUntil().getTime();
if(n!=f.getTime()){n=this._scheduler.utcToDisplay(l.get_recursUntil());
if(!this._getElement("AllDayEvent").checked){n=d.add(n,-i);
}l.set_recursUntil(n);
}}else{m.set_startDate(this._appointment.get_start());
m.set_endDate(this._appointment.get_end());
}m.set_recurrenceRule(k);
},_populateReminder:function(){var l=this._getReminderDropDown();
if(!l){return;
}var k=this._appointment.get_reminders().getReminder(0);
if(!k){this._selectDropDownValue(l.get_element(),"");
}else{this._selectDropDownValue(l.get_element(),k.get_trigger());
}},_selectDropDownValue:function(k,l){var m=$find(k.id);
if(m&&b.RadComboBox.isInstanceOfType(m)){m.get_items().forEach(function(n){if(n.get_value()==l){n.select();
}});
}else{e.each(k.options,function(){if(this.value==l){this.selected=true;
return false;
}});
}},_getSubjectTextBox:function(){return $find(this._templateId+"_Subject");
},_getDescriptionTextBox:function(){return $find(this._templateId+"_Description");
},_getRecurrenceEditor:function(){return $find(this._templateId+"_RecurrenceEditor");
},_getReminderDropDown:function(){return this._getControl("Reminder");
},_getElement:function(k){return $get(this._templateId+"_"+k);
},_getControl:function(k){return $find(this._templateId+"_"+k);
},_initializePickers:function(){var l=Function.createDelegate(this,this._showPopup);
var n=this._templateId;
this._pickers={startDate:$find(n+"_StartDate"),endDate:$find(n+"_EndDate"),startTime:$find(n+"_StartTime"),endTime:$find(n+"_EndTime")};
e.each(this._pickers,function(){if(this&&this.get_dateInput){this.get_dateInput().add_focus(l);
}});
var k=[$get(this._pickers.startDate.get_element().id+"_wrapper"),$get(this._pickers.startTime.get_element().id+"_wrapper"),$get(this._pickers.startTime.get_element().id+"_timeView_wrapper"),$get(this._pickers.endDate.get_element().id+"_wrapper"),$get(this._pickers.endTime.get_element().id+"_wrapper"),$get(this._pickers.endTime.get_element().id+"_timeView_wrapper"),$get(this._templateId+"_SharedCalendar")];
var o=this;
var m="focusin";
e(this._formElement).bind(m,function(t){var q=false;
for(var p=0,r=k.length;
p<r;
p++){var s=k[p];
if($telerik.isDescendantOrSelf(s,t.target)){q=true;
break;
}}if(!q){o._hidePickerPopups();
}});
e(this._formElement).bind("formMoving",function(){o._hidePickerPopups();
});
if(this._isModal){e(document).bind("scroll."+this._eventNamespace,function(){o._hidePickerPopups();
});
}},_initializeAdvancedFormValidators:function(){var l=this._createValidatorToolTip();
if(typeof(Page_Validators)=="undefined"){return;
}for(var k=0;
k<Page_Validators.length;
k++){var n=Page_Validators[k];
if(this._validatorIsInTemplate(n)){var m=e("#"+n.controltovalidate);
if(m.length==0){break;
}if(m.parent().is(".rsAdvDatePicker")||m.parent().is(".rsAdvTimePicker")){e("#"+n.controltovalidate+"_dateInput_text").bind("focus",{toolTip:l},this._showToolTip).bind("blur",{toolTip:l},this._hideToolTip)[0].errorMessage=n.errormessage;
}else{m.addClass("rsValidatedInput");
}m[0].errorMessage=n.errormessage;
this._updateValidator(n,m);
}}var p=this;
var o=ValidatorUpdateDisplay;
ValidatorUpdateDisplay=function(q){if(p._validatorIsInTemplate(q)&&q.controltovalidate){p._updateValidator(q);
}else{o(q);
}};
e(".rsValidatedInput",this._formElement).bind("focus",{toolTip:l},this._showToolTip).bind("blur",{toolTip:l},this._hideToolTip);
},_initializeAllDayCheckbox:function(){var p=e("#"+this._templateId+"_AllDayEvent");
var u=e(p[0].parentNode.parentNode.parentNode);
var n=u.find(".rsAdvTimePicker");
if($telerik.isIE6||$telerik.isIE7){e(".rsAdvTimePicker, .rsAdvDatePicker",this._formElement).css({display:"inline",zoom:1,width:""});
}else{e(".rsAdvTimePicker, .rsAdvDatePicker",this._formElement).css({display:"inline-block",width:""});
}var r=e("#"+this._templateId+"_StartTime_dateInput_text").outerWidth();
n.width(r);
var s=e(".rsTimePick",this._formElement).eq(0).outerWidth();
var o=s-r;
var w=$get(this._templateId+"_StartTimeValidator");
var m=$get(this._templateId+"_StartTimeValidator");
var k=this;
u.find(".rsAdvTimePicker > input").css("display","none");
var v=k._pickers.startTime;
var q=k._pickers.endTime;
var l=v.get_enabled();
var x=q.get_enabled();
var t=function(y,A){var z=function(){if($telerik.isSafari||$telerik.isOpera){n.css("display","inline-block");
}else{n.show();
}};
if(!y){z();
}u.find(".rsTimePick").each(function(){if(A){e(this).stop();
if(y){e(this).animate({width:o},"fast","linear",function(){n.hide();
});
}else{e(this).animate({width:s},"fast");
}}else{if(y){n.hide();
e(this).width(o);
}else{e(this).width(s);
}}});
if(typeof(ValidatorEnable)!="undefined"){ValidatorEnable(w,!y);
ValidatorEnable(m,!y);
}if(l){v.set_enabled(!y);
}if(x){q.set_enabled(!y);
}};
this._onAllDayCheckBoxClick=t;
t(p[0].checked,false);
p.click(function(){t(this.checked,true);
});
},_initializeResetExceptions:function(){var k=e("#"+this._templateId+"_ResetExceptions");
if(k.length==0){return;
}var l=this._scheduler;
var m=this;
var o=l.get_localization();
var n=o.AdvancedDone;
if(k[0].innerHTML.indexOf(n)>-1){k.click(function(){return false;
});
window.setTimeout(function(){k.fadeOut("slow");
},2000);
}else{k.click(function(){var p=m._getRemoveExceptionsDialog();
p.set_onActionConfirm(function(){k[0].innerHTML=o.AdvancedWorking;
window.location.href=k[0].href;
p.dispose();
}).show();
return false;
});
}},_getRemoveExceptionsDialog:function(){var k=this._scheduler.get_localization();
return $telerik.$.modal(this._formElement).initialize().set_content({title:k.ConfirmResetExceptionsTitle,content:k.ConfirmResetExceptionsText,ok:k.ConfirmOK,cancel:k.ConfirmCancel});
},_updateValidator:function(l){var k=e("#"+l.controltovalidate);
if(k.is(".rsValidatedInput")){k=k.parent();
}if(!l.isvalid){k.addClass("rsInvalid");
}else{k.removeClass("rsInvalid");
}},_validatorIsInTemplate:function(k){return e(k).parents().is("#"+this._schedulerElementId);
},_createValidatorToolTip:function(){return e("<div></div>").hide().appendTo(e(".rsAdvancedEdit:visible",$get(this._schedulerElementId)));
},_showToolTip:function(s){var l=s.data.toolTip;
var q=e(this);
var o=false;
var k=q.parent();
if(q.is("textarea")){o=true;
q=k;
}var p=q.is(".rsInvalid");
p=p||k.parent().children().is(".rsInvalid");
if(p){l.css("visibility","hidden").text(this.errorMessage).addClass("rsValidatorTooltip");
var r=q;
if(k.is(".riCell")){r=k;
}var m=r.position();
var n=m.left+"px";
if(o){n=(m.left+r.outerWidth()-l.outerWidth())+"px";
}var t=(m.top-l.outerHeight())+"px";
l.css({top:t,left:n,zIndex:h,visibility:"visible"}).fadeIn("fast");
}},_hideToolTip:function(k){var l=k.data.toolTip;
l.hide();
},_hidePickerPopups:function(){if(!this._pickers){return;
}for(var l in this._pickers){var k=this._pickers[l];
if(!k){continue;
}if(k.hideTimePopup){k.hideTimePopup();
}else{k.hidePopup();
}}},_showPopup:function(k){this._hidePickerPopups();
if(k.Owner.showTimePopup){k.Owner.showTimePopup();
}else{k.Owner.showPopup();
}}};
})();
