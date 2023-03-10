Type.registerNamespace("Telerik.Web.UI");
(function(){var d=$telerik.$,b=Telerik.Web.UI,c=b.Scheduler.DateTime;
var e=60000;
var a=60*e;
var f=24*a;
b.ReminderDialog=function(g){b.ReminderDialog.initializeBase(this,[g]);
this._baseId=this.get_id();
this._reminders=[];
this._localization=null;
this._updateRemindersTextDelegate=Function.createDelegate(this,this._updateRemindersText);
};
b.ReminderDialog.prototype={initialize:function(){b.ReminderDialog.callBaseMethod(this,"initialize");
this._applicationLoadedCallback=Function.createDelegate(this,this._applicationLoaded);
Sys.Application.add_load(this._applicationLoadedCallback);
this._initializeButtons();
},dispose:function(){b.ReminderDialog.callBaseMethod(this,"dispose");
},registerReminder:function(j){var g=false;
d.each(this._reminders,function(){if(this.get_id()==j.get_id()){var k=this.get_owner();
var l=j.get_owner();
if(k&&l){g=k.get_id()==l.get_id();
}else{g=true;
}return false;
}});
if(g){return;
}this._reminders.push(j);
var h=this._getRemindersListBox();
var i=new b.RadListBoxItem();
h.get_items().add(i);
this._updateRemindersText();
this._updateTitleBar();
if(h.get_items().get_count()==1){i.select();
this._updateTitle();
}},get_localization:function(){return this._localization;
},set_localization:function(g){this._localization=Sys.Serialization.JavaScriptSerializer.deserialize(g);
},_updateRemindersText:function(){var j=this._getRemindersListBox();
var k=j.get_items();
for(var h=0,g=k.get_count();
h<g;
h++){k.getItem(h).set_text(this._getReminderText(this._reminders[h]));
}if(this._reminders.length>0){setTimeout(this._updateRemindersTextDelegate,e);
}},_getReminderText:function(g){var h=g.get_owner();
var k=this.get_localization();
var l=c.subtract(h.get_start(),new Date());
var j,i;
if(Math.abs(l)<a){j=Math.floor(Math.abs(l)/e);
i=(j==1)?k.Minute:k.Minutes;
}else{j=Math.floor(Math.abs(l)/a);
i=(j==1)?k.Hour:k.Hours;
}if(l<0){return String.format("{0} ({1} {2} {3})",h.get_subject(),j,i,k.Overdue);
}else{return String.format("{0} ({1} {2} {3})",h.get_subject(),k.DueIn,j,i);
}},_unregisterReminders:function(g){var h=this;
d.each(g,function(){var i=Array.indexOf(h._reminders,this);
if(i!=-1){Array.removeAt(h._reminders,i);
h._getRemindersListBox().get_items().removeAt(i);
}});
this._updateTitleBar();
},_applicationLoaded:function(){Sys.Application.remove_load(this._applicationLoadedCallback);
this._initializeListBox();
},_initializeListBox:function(){var h=Function.createDelegate(this,this._updateTitle);
var g=this._getRemindersListBox();
g.add_selectedIndexChanged(h);
g.add_disposing(function(){g.remove_selectedIndexChanged(h);
});
},_initializeButtons:function(){var g=this;
d(".rsRemTitleBarCloseBtn",this.get_element()).click(function(h){d.raiseControlEvent(g,"close",{});
$telerik.cancelRawEvent(h);
}).attr("href","#");
d(".rsRemDismissAllBtn",this.get_element()).click(function(h){d.raiseControlEvent(g,"dismiss",{reminders:g._reminders,hasMoreReminders:false});
$telerik.cancelRawEvent(h);
g._unregisterReminders(g._reminders);
}).attr("href","#");
d(".rsRemOpenItemBtn",this.get_element()).click(function(h){d.raiseControlEvent(g,"openItem",{reminders:g._getSelectedReminders()});
$telerik.cancelRawEvent(h);
}).attr("href","#");
d(".rsRemDismissBtn",this.get_element()).click(function(j){var i=g._getSelectedReminders();
var h=g._reminders.length>i.length;
d.raiseControlEvent(g,"dismiss",{reminders:g._getSelectedReminders(),hasMoreReminders:h});
$telerik.cancelRawEvent(j);
g._unregisterReminders(i);
}).attr("href","#");
d(".rsRemSnoozeBtn",this.get_element()).click(function(j){var i=g._getSelectedReminders();
var h=parseInt(g._getSnoozeTimeComboBox().get_value(),10);
d.raiseControlEvent(g,"snooze",{reminders:i,minutes:h});
$telerik.cancelRawEvent(j);
g._unregisterReminders(i);
}).attr("href","#");
},_getSelectedReminders:function(){var g=this;
return d.map(this._getRemindersListBox().get_selectedItems(),function(h){return g._reminders[h.get_index()];
});
},_updateTitleBar:function(){var h=this._reminders.length;
var g=this.get_localization();
var i=h+" "+(h>1?g.Reminders:g.Reminder);
d(".rsRemTitleBarText",this.get_element()).text(i);
},_updateTitle:function(){var g=this._reminders[this._getRemindersListBox().get_selectedIndex()];
var h=g.get_owner();
d(".rsRemTitleSubject",this.get_element()).text(h.get_subject());
d(".rsRemTitleDate",this.get_element()).text(h.get_start().toLocaleString("D"));
},get_localization:function(){if(!this._localization){this._localization=this.get_parent().get_localization();
}return this._localization;
},_getElement:function(g){return $get(this._baseId+"_"+g);
},_getControl:function(g){return $find(this._baseId+"_"+g);
},_getRemindersListBox:function(){return this._getControl("RemindersList");
},_getSnoozeTimeComboBox:function(){return this._getControl("SnoozeTime");
}};
d.registerControlEvents(b.ReminderDialog,["close","dismiss","openItem","snooze"]);
b.ReminderDialog.registerClass("Telerik.Web.UI.ReminderDialog",b.RadWebControl);
})();
