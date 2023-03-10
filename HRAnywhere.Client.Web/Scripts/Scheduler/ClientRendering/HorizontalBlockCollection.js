Type.registerNamespace("Telerik.Web.UI.Scheduler.Rendering");
(function(){var a=60000;
var e=a*60;
var b=e*24;
var c=Telerik.Web.UI.Scheduler.DateTime;
var d=Telerik.Web.UI.Scheduler.Rendering;
d.Row=function(f){this._index=f;
this._parts=new Array();
};
d.Row.prototype={tryAdd:function(h){for(var f=0,g=this._parts.length;
f<g;
f++){if(this.partsOverlap(this._parts[f],h)){this.addToNextRow(h);
return;
}}this.addPart(h);
},partsOverlap:function(g,f){return(g.end>f.start&&g.start<f.end);
},addToNextRow:function(f){if(!this._nextRow){this._nextRow=new d.Row(this._index+1);
}this._nextRow.tryAdd(f);
},addPart:function(f){Array.insert(this._parts,this._parts.length,f);
f.rowIndex=this._index;
}};
d.HorizontalBlockCollection=function(){this._parts=new Array();
};
d.HorizontalBlockCollection.prototype={add:function(f){if(!this._firstRow){this._firstRow=new d.Row(0);
}this._firstRow.tryAdd(f);
Array.insert(this._parts,this._parts.length,f);
},remove:function(f){if(!this._firstRow){return;
}Array.remove(this._parts,f);
this._firstRow=new d.Row(0);
for(var g=0,h=this._parts.length;
g<h;
g++){this._firstRow.tryAdd(this._parts[g]);
}}};
d.HorizontalBlockCollection.registerClass("Telerik.Web.UI.Scheduler.Rendering.HorizontalBlockCollection");
})();
