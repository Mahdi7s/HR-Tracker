Type.registerNamespace("Telerik.Web.UI.Scheduler");
(function(a,b){b.DateGroupedWeekModel=function(c,d,e){b.DateGroupedWeekModel.initializeBase(this,[c,d,e]);
};
b.DateGroupedWeekModel.prototype={_getRawIndexFromDomElement:function(g){while(g&&(g.tagName.toUpperCase()!="TD")){g=g.parentNode;
}if(!g){return null;
}var m=g.parentNode;
var j=m.parentNode;
var h=g.cellIndex;
var l=g.parentNode.rowIndex;
var k=Sys.UI.DomElement.containsCssClass(m,"rsAllDayRow");
var c=k?0:1;
var i;
var d;
var f;
if(this._isVertical){i=h;
var e=j.rows.length/this.get_numberOfDays();
f=l%e;
if(this._owner.get_showAllDayRow()&&!k){f--;
}d=Math.floor(l/e);
}else{i=h%this._resources.get_count();
d=Math.floor(h/this._resources.get_count());
f=l;
}return{modelIndex:i,viewPartIndex:c,rowIndex:f,cellIndex:d};
},_getTimeFromDomElement:function(f){var d=this._getRawIndexFromDomElement(f);
var c=new Date(this._getFirstDayStart());
var e=d.rowIndex*this._owner.get_minutesPerRow();
a.RadScheduler._incrementTime(c,24*d.cellIndex,e);
return c;
},_getRenderer:function(){if(!this._renderer){this._renderer=new b.Rendering.DateGroupedWeekViewRenderer(this);
}return this._renderer;
},get_supportsSlotSelection:function(){return false;
}};
b.DateGroupedWeekModel.registerClass("Telerik.Web.UI.Scheduler.DateGroupedWeekModel",b.ResourceGroupedWeekModel);
})(Telerik.Web.UI,Telerik.Web.UI.Scheduler);
