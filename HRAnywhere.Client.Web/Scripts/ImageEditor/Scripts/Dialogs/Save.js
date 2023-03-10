Type.registerNamespace("Telerik.Web.UI.ImageEditor");
(function(c,a,b){b.Save=function(d){b.Save.initializeBase(this,[d]);
this._okBtn=null;
this._cancelBtn=null;
};
b.Save.prototype={initialize:function(){b.Save.callBaseMethod(this,"initialize");
this._attachHandlers(true);
this.get_imageEditor().get_formDecorator().decorate(this.get_textBox().parentNode.parentNode.parentNode);
},dispose:function(){this._attachHandlers(false);
b.Save.callBaseMethod(this,"dispose");
},get_textBox:function(){if(!this._textBox){this._textBox=$get(this.get_parentId()+"TxtFileName");
}return this._textBox;
},get_radioDownload:function(){if(!this._radioDownload){this._radioDownload=$get(this.get_parentId()+"btnList_0");
}return this._radioDownload;
},get_checkBoxOverwrite:function(){if(!this._cbOverwrite){this._cbOverwrite=$get(this.get_parentId()+"cbOverwrite");
}return this._cbOverwrite;
},get_okBtn:function(){if(!this._okBtn){this._okBtn=$find(this.get_parentId()+"btnOk");
}return this._okBtn;
},get_cancelBtn:function(){if(!this._cancelBtn){this._cancelBtn=$find(this.get_parentId()+"btnCancel");
}return this._cancelBtn;
},_attachHandlers:function(e){var d=this.get_okBtn();
var f=this.get_cancelBtn();
if(e){this._buttonClickDelegate=Function.createDelegate(this,this._buttonClick);
if(d){d.add_clicked(this._buttonClickDelegate);
}if(f){f.add_clicked(this._buttonClickDelegate);
}}else{if(d){d.remove_clicked(this._buttonClickDelegate);
}if(f){f.remove_clicked(this._buttonClickDelegate);
}this._buttonClickDelegate=null;
}},_buttonClick:function(g,i){var d=this.get_textBox().value;
var f=this.get_imageEditor();
var e=this.get_radioDownload().checked;
var h=this.get_checkBoxOverwrite().checked;
if(i.get_commandName()=="OK"){if(e){f.saveImageOnClient(d);
}else{f.saveImageOnServer(d,h);
}}f.closeToolsPanel();
},get_name:function(){return"Save";
},updateUI:function(){}};
b.Save.registerClass("Telerik.Web.UI.ImageEditor.Save",b.ToolWidget,b.IToolWidget);
})($telerik.$,Telerik.Web.UI,Telerik.Web.UI.ImageEditor);
