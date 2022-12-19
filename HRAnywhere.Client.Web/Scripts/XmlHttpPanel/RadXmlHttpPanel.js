Type.registerNamespace("Telerik.Web.UI");
(function(b,a){$telerik.toXmlHttpPanel=function(c){return c;
};
$telerik.findXmlHttpPanel=$find;
b.registerEnum(a,"XmlHttpPanelWcfRequestMethod",{GET:1,POST:2,PUT:4,DELETE:8});
a.RadXmlHttpPanel=function(c){a.RadXmlHttpPanel.initializeBase(this,[c]);
this._uniqueId="";
this._isCallbackPanel=false;
this._loadingPanelID="";
this._async=true;
this._dropDownTouchScroll=null;
this._wcfRequestMethod=a.XmlHttpPanelWcfRequestMethod.GET;
};
a.RadXmlHttpPanel.prototype={initialize:function(){a.RadXmlHttpPanel.callBaseMethod(this,"initialize");
this._loaded=true;
if(!this._isCallbackPanel&&this.get_value()){this.set_value(this.get_value());
}if(a.TouchScrollExtender._getNeedsScrollExtender()&&!this._dropDownTouchScroll){this._createTouchScrollExtender(true);
}},dispose:function(){this._createTouchScrollExtender(false);
a.RadXmlHttpPanel.callBaseMethod(this,"dispose");
},get_value:function(){return this._value;
},set_value:function(c){this._value=c;
if(!this._loaded){return;
}window.setTimeout(Function.createDelegate(this,function(){this._showLoadingPanel();
if(this.get_wcfServicePath()){this._execWsfServiceCall();
}else{if(this._isCallbackPanel){this._execCallback();
}else{var d=this._getWebServiceLoader();
d.loadData({context:this._getWebServiceArgument()});
}}}),10);
},reload:function(){this.set_value(this.get_value());
},_raiseResponseEnded:function(){this.raiseEvent("responseEnded",new Sys.EventArgs());
},set_html:function(f){this._hideLoadingPanel();
var h=new a.RadXmlHttpPanelEventArgs(f);
this.raiseEvent("responseEnding",h);
if(h.get_cancel()){return;
}f=h.get_content();
var g=this.get_wcfServiceMethod();
if(g){var e=g+"Result";
if(f[e]){f=f[e];
}}if(!f||typeof f!=="string"){f="";
}var c=this.get_element();
this._disposeElement(c,true);
c.innerHTML=f;
if(this.get_enableClientScriptEvaluation()){var d=Function.createDelegate(this,this._raiseResponseEnded);
$telerik.evalScripts(c,d);
}else{this._raiseResponseEnded();
}},_disposeElement:function(e,f){if(!e){return;
}if(e.nodeType===1){var d=e.getElementsByTagName("*");
for(var c=d.length-1;
c>=0;
c--){this._disposeElementInternal(d[c]);
}if(!f){this._disposeElementInternal(e);
}}},_disposeElementInternal:function(f){var g=f.dispose;
if(g&&typeof(g)==="function"){f.dispose();
}else{var e=f.control;
if(e&&typeof(e.dispose)==="function"){e.dispose();
}}},_hideLoadingPanel:function(){var c=this._getLoadingPanel();
if(c&&c.hide){c.hide(this.get_element().id);
}},_showLoadingPanel:function(){var c=this._getLoadingPanel();
if(c&&c.show){c.show(this.get_element().id);
}},_getLoadingPanel:function(){return $find(this.get_loadingPanelID());
},_getWebServiceArgument:function(){var c={Value:this._value};
return c;
},_getCallbackArgument:function(){var d=this.get_value().replace(/"/g,'\\"');
var c=String.format('{{ Value : "{0}"}}',d);
return c;
},_onError:function(c){if(!c){c="No error data available";
}this._hideLoadingPanel();
var d=new a.RadXmlHttpPanelErrorEventArgs(c);
this.raiseEvent("responseError",d);
if(!d.get_cancelErrorAlert()){alert("XmlHttpPanel loading error:\n Exception="+c);
}},_createTouchScrollExtender:function(e){var f=this.get_element();
if(f){var c=this._dropDownTouchScroll;
if(c){if(!e){c.dispose();
this._dropDownTouchScroll=null;
}}else{if(e){var d=$telerik.$(f).css("overflow");
if(d=="scroll"||d=="auto"){this._dropDownTouchScroll=new a.TouchScrollExtender(f);
this._dropDownTouchScroll.initialize();
}}}}},_execWsfServiceCall:function(){var d=Function.createDelegate(this,this._onWsfServiceResponse);
var c=Function.createDelegate(this,this._onWsfServiceError);
b.ajax({type:this.get_wcfRequestMethod(),url:this.get_wcfServicePath()+"/"+this.get_wcfServiceMethod(),data:this.get_value(),contentType:"application/json; charset=utf-8",dataType:"json",processdata:true,success:d,error:c});
},_onWsfServiceResponse:function(c){this.set_html(c);
},_onWsfServiceError:function(c){this._onError(c.statusText);
},_onCallbackResponse:function(c,d){this.set_html(c);
},_onCallbackError:function(c,d){this._onError(c);
},_execCallback:function(){var e=Function.createDelegate(this,this._onCallbackResponse);
var c=Function.createDelegate(this,this._onCallbackError);
var d=this._getCallbackArgument();
return WebForm_DoCallback(this._uniqueId,d,e,"SOME_CONTEXT",c,this.get_async());
},_getWebServiceLoader:function(){if(!this._webServiceLoader){var c=new a.WebServiceSettings({path:this.get_webMethodPath(),method:this.get_webMethodName()});
this._webServiceLoader=new a.WebServiceLoader(c);
this._webServiceLoader.add_loadingError(Function.createDelegate(this,this._onWebServiceError));
this._webServiceLoader.add_loadingSuccess(Function.createDelegate(this,this._onWebServiceResponse));
}return this._webServiceLoader;
},_onWebServiceError:function(c,d){this._onError(d.get_message());
},_onWebServiceResponse:function(e,d){var c=d.get_data();
this.set_html(c);
},add_responseEnd:function(c){this.get_events().addHandler("responseEnding",c);
},remove_responseEnd:function(c){this.get_events().removeHandler("responseEnding",c);
},get_loadingPanelID:function(){return this._loadingPanelID;
},set_loadingPanelID:function(c){if(this._loadingPanelID!=c){this._loadingPanelID=c;
}},get_async:function(){return this._async;
},set_async:function(c){this._async=!!c;
},get_wcfRequestMethod:function(){try{return a.XmlHttpPanelWcfRequestMethod.toString(this._wcfRequestMethod);
}catch(c){return a.XmlHttpPanelWcfRequestMethod.toString(a.XmlHttpPanelWcfRequestMethod.GET);
}},set_wcfRequestMethod:function(c){if(c&&c.toUpperCase){c=a.XmlHttpPanelWcfRequestMethod[c.toUpperCase()]||c;
}this._wcfRequestMethod=c;
}};
b.registerControlProperties(a.RadXmlHttpPanel,{enableClientScriptEvaluation:false,wcfServicePath:null,wcfServiceMethod:null,webMethodName:null,webMethodPath:null});
b.registerControlEvents(a.RadXmlHttpPanel,["responseEnding","responseEnded","responseError"]);
a.RadXmlHttpPanel.registerClass("Telerik.Web.UI.RadXmlHttpPanel",a.RadWebControl);
a.RadXmlHttpPanelEventArgs=function(c){a.RadXmlHttpPanelEventArgs.initializeBase(this);
this._content=c;
};
a.RadXmlHttpPanelEventArgs.prototype={get_content:function(){return this._content;
},set_content:function(c){this._content=c;
}};
a.RadXmlHttpPanelEventArgs.registerClass("Telerik.Web.UI.RadXmlHttpPanelEventArgs",Sys.CancelEventArgs);
a.RadXmlHttpPanelErrorEventArgs=function(c){a.RadXmlHttpPanelErrorEventArgs.initializeBase(this);
this._cancelErrorAlert=false;
this._errorMessage=c;
};
a.RadXmlHttpPanelErrorEventArgs.prototype={get_errorMessage:function(){return this._errorMessage;
},get_cancelErrorAlert:function(){return this._cancelErrorAlert;
},set_cancelErrorAlert:function(c){this._cancelErrorAlert=c;
}};
a.RadXmlHttpPanelErrorEventArgs.registerClass("Telerik.Web.UI.RadXmlHttpPanelErrorEventArgs",Sys.EventArgs);
})($telerik.$,Telerik.Web.UI);