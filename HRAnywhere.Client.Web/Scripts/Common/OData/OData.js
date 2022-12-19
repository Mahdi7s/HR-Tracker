(function(b,d){var e="Telerik.OData.ItemsUrl",f="$callback",a="application/json",c={0:"json",1:"jsonp"};
b.ODataSettings=function(h){b.ODataSettings.initializeBase(this,[h]);
var g=h.ODataSettings;
this._path=h.Path;
this._odata=true;
this._responseType=g.ResponseType;
this._tree=new b.ODataBinderTree(g.InitialContainerName,g.Entities,g.EntityContainer);
};
b.ODataSettings.prototype={get_path:function(){return this._path;
},get_responseType:function(){return this._responseType;
},get_tree:function(){return this._tree;
},get_isEmpty:function(){return false;
}};
b.ODataSettings.registerClass("Telerik.Web.UI.ODataSettings",b.WebServiceSettings);
b.ODataBinderTree=function(h,g,i){this._entities=g;
this._map=i;
this._tree=this._buildTree(h);
};
b.ODataBinderTree.prototype={get_settingsByDepth:function(h){function g(j,i){if(j==h){return i;
}return g(++j,i.child);
}return g(0,this._tree);
},_buildTree:function(h){var g=!!h?this._getEntitySetByName(h):this._map[0];
return this._buildNode(g,this._findChildCallback);
},_findChildCallback:function(g){if(!g){return;
}var h=this._getEntitySetByName(g);
return this._buildNode(h,this._findChildCallback);
},_buildNode:function(i,h){var g=this._getEntityByName(i.Name),j=this,k={name:i.Name,type:i.EntityType,entity:g,child:h.apply(j,[g.NavigationProperty])};
return k;
},_getByName:function(h,k){for(var g=0;
g<h.length;
g++){var j=h[g];
if(j.Name===k){return j;
}}},_getEntityByName:function(g){return this._getByName(this._entities,this._getEntitySetByName(g).EntityType);
},_getEntitySetByName:function(g){return this._getByName(this._map,g);
}};
b.ODataLoader=function(h,g){b.ODataLoader.initializeBase(this,[h]);
if(g){this._expandCallback=g;
}else{this._expandCallback=function(){return -1;
};
}};
b.ODataLoader.prototype={_createRootUrl:function(g,h){if(g[g.length-1]=="/"){page=g.slice(0,g.length-1);
}return g+"/"+h;
},_getDefferedItemsUrl:function(i){var h=i.get_attributes();
var g=h.getAttribute(e);
h.removeAttribute(e);
return g;
},_appendQueryStringParameters:function(g){return g+"/?$format=json";
},_getAjaxSettings:function(h){h=this._appendQueryStringParameters(h);
var g=this.get_webServiceSettings();
return{url:h,headers:{Accepts:a},dataType:c[g.get_responseType()],jsonp:f};
},get_expandCallback:function(){return this._expandCallback;
},loadData:function(g,h){var j=this.get_webServiceSettings(),k,i,l=false;
if(g.isRootLevel){k=j.get_tree().get_settingsByDepth(0);
i=this._getAjaxSettings(this._createRootUrl(j.get_path(),k.name));
}else{i=this._getAjaxSettings(this._getDefferedItemsUrl(h)),level=h.get_level()+1,k=j.get_tree().get_settingsByDepth(level);
l=true;
}this._sendAjaxRequest(i,h,k.entity,this._onWebServiceSuccess);
if(l){this._raiseEvent("loadingStarted",new Telerik.Web.UI.WebServiceLoaderEventArgs(h));
}},_sendAjaxRequest:function(g,l,i,j){var k=this,h=d.ajax(g);
h.fail(function(n){var m={get_message:function(){return n.statusText;
}};
k._onWebServiceError(m,l);
}).done(function(o){var m=[],n=k._sanitize(o);
d.each(n,function(q,p){m[m.length]={Text:p[i.DataTextField],Value:p[i.DataValueField],ExpandMode:k.get_expandCallback()(i.NavigationProperty),Attributes:(function(){if(i.NavigationProperty&&p[i.NavigationProperty]){return{"Telerik.OData.ItemsUrl":p[i.NavigationProperty].__deferred.uri};
}else{return{};
}})()};
});
j.apply(k,[m,l]);
});
},_sanitize:function(g){var h=g.d.results?g.d.results:g.d;
if(!(h instanceof Array)){h=d.makeArray(h);
}return h;
}};
b.ODataLoader.registerClass("Telerik.Web.UI.ODataLoader",b.WebServiceLoader);
})(Telerik.Web.UI,$telerik.$);
