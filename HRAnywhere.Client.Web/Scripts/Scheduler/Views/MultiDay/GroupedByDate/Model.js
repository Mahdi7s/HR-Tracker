Type.registerNamespace("Telerik.Web.UI");
Type.registerNamespace("Telerik.Web.UI.Scheduler");
(function(){var a=Telerik.Web.UI.Scheduler;
a.DateGroupedMultiDayModel=function(b,c,d){a.DateGroupedMultiDayModel.initializeBase(this,[b,c,d]);
};
a.DateGroupedMultiDayModel.prototype={_createNestedModel:function(){return new a.MultiDayModel(this._owner);
},get_visibleRangeStart:function(){return this._weekModels[0].get_visibleRangeStart();
},get_visibleRangeEnd:function(){return this._weekModels[0].get_visibleRangeEnd();
},get_numberOfDays:function(){return this._weekModels[0].get_numberOfDays();
},_getFirstDayStart:function(){return this._weekModels[0]._getFirstDayStart();
},_getRenderer:function(){if(!this._renderer){this._renderer=new a.Rendering.DateGroupedMultiDayViewRenderer(this);
}return this._renderer;
}};
a.DateGroupedMultiDayModel.registerClass("Telerik.Web.UI.Scheduler.DateGroupedMultiDayModel",a.DateGroupedWeekModel);
})();
