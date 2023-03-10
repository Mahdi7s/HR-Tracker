Type.registerNamespace("Telerik.Web.UI.Scheduler");
(function(a){a.DayModel=function(b){a.DayModel.initializeBase(this,[b]);
this._settings=this._owner.get_dayViewSettings();
this._defaultHeaderDateFormat="D";
};
a.DayModel.prototype={get_numberOfDays:function(){return 1;
},_getRenderer:function(){if(!this._renderer){this._renderer=new a.Rendering.DayViewRenderer(this);
}return this._renderer;
},_processRowSelection:function(d,k){var h=this._owner._rowSelectionState;
var f=h.rowSelectionEndSlot;
var i=this.getTimeSlotFromDomElement(d);
var g=h.rowSelectionStartSlot.get_rawIndex();
var c=i.get_rawIndex();
if((c.viewPartIndex!=g.viewPartIndex)||(c.modelIndex!=g.modelIndex)){return;
}var b=(f)?true:false;
var j=true;
if(b){var e=f.get_rawIndex();
j=((c.cellIndex==e.cellIndex)&&(c.rowIndex==e.rowIndex)&&(c.viewPartIndex==e.viewPartIndex))?true:false;
}if(!(b&&j)){h.rowSelectionEndSlot=i;
k.apply(this._owner);
}}};
a.DayModel.registerClass("Telerik.Web.UI.Scheduler.DayModel",a.MultiDayModel);
})(Telerik.Web.UI.Scheduler);
