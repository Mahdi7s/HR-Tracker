Type.registerNamespace("Telerik.Web.UI.ImageEditor");
(function(c,a,b){b.Print=function(d){b.Print.initializeBase(this,[d]);
this._printBtn=null;
this._cancelBtn=null;
};
b.Print.prototype={initialize:function(){b.Print.callBaseMethod(this,"initialize");
this._printImage=this._getControlFromParent("printImageOverview");
this._attachHandlers(true);
},print:function(){try{if($telerik.isOpera){this.printFromCurrentPage();
}else{this.printFromIframe();
}}catch(d){}},printFromIframe:function(){c("#print-image-frame").remove();
var e=c("<iframe src='about:blank' name='print-image-frame' frameborder='0' scrolling='no' id='print-image-frame'>");
e.css({border:"none",position:"absolute",width:0,height:0,bottom:0,left:0});
c("body").append(e);
var d=e[0].contentWindow||e[0].contentDocument;
var f=d.document||d;
if(!c.isWindow(d)){d=window.frames["print-image-frame"];
}this._writeImageToFrameDocument(f);
if($telerik.isIE){f.execCommand("Print",null,false);
}else{d.print();
}},printFromCurrentPage:function(){var e=this._getPrintImage();
e.attr("id","print-image").css({display:"block",position:"absolute",top:"6px",left:"1px",zIndex:10000,visibility:"visible"});
var d=c("body");
var f={visibility:d.css("visibility"),overflow:d.css("overflow"),background:d.css("background")};
d.css({visibility:"hidden",overflow:"hidden",background:"transparent"});
d.append(e);
window.print();
e.remove();
d.css(f);
},dispose:function(){this._attachHandlers(false);
b.Print.callBaseMethod(this,"dispose");
},get_printBtn:function(){if(!this._printBtn){this._printBtn=this._findControlFromParent("btnPrint");
}return this._printBtn;
},get_cancelBtn:function(){if(!this._cancelBtn){this._cancelBtn=this._findControlFromParent("btnCancel");
}return this._cancelBtn;
},_attachHandlers:function(d){var f=this.get_printBtn();
var e=this.get_cancelBtn();
if(d){this._buttonClickDelegate=Function.createDelegate(this,this._buttonClick);
if(f){f.add_clicked(this._buttonClickDelegate);
}if(e){e.add_clicked(this._buttonClickDelegate);
}}else{if(f){f.remove_clicked(this._buttonClickDelegate);
}if(e){e.remove_clicked(this._buttonClickDelegate);
}this._buttonClickDelegate=null;
}},_buttonClick:function(d,e){if(e.get_commandName()=="Print"){this.print();
}this.close();
},_writeImageToFrameDocument:function(d){var e=this._getPrintImage();
d.open();
d.write(c("<div/>").append(e).html());
d.close();
},_getPrintImage:function(){return c(this.get_imageEditor().getEditableImage().getImage()).clone();
},get_name:function(){return"Print";
},updateUI:function(){}};
b.Print.registerClass("Telerik.Web.UI.ImageEditor.Print",b.ToolWidget,b.IToolWidget);
})($telerik.$,Telerik.Web.UI,Telerik.Web.UI.ImageEditor);
