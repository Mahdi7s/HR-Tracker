Type.registerNamespace("Telerik.Web.UI");
Telerik.Web.UI.TreeListKeyboardNavigation=function(){Telerik.Web.UI.TreeListKeyboardNavigation.initializeBase(this);
this._owner=null;
this._submitElements=[];
this._itemForFocusedControl=null;
this._isInsertFormFocused=false;
this._startRangeIndex=null;
this._isFocusKeyPressed=false;
this._insertDeleteHandled=false;
this._documentKeyDownDelegate=null;
this._onKeyDownDelegate=null;
this._onKeyPressDelegate=null;
};
Telerik.Web.UI.TreeListKeyboardNavigation.prototype={initialize:function(){Telerik.Web.UI.TreeListKeyboardNavigation.callBaseMethod(this,"initialize");
if(this._owner){var b=this._owner.get_element();
b.tabIndex=0;
this._documentKeyDownDelegate=Function.createDelegate(this,this._documentKeyDown);
$addHandler(document,"keydown",this._documentKeyDownDelegate);
this._onKeyDownDelegate=Function.createDelegate(this,this._onKeyDownHandler);
$addHandler(b,"keydown",this._onKeyDownDelegate);
this._onKeyPressDelegate=Function.createDelegate(this,this._onKeyPressHandler);
$addHandler(b,"keypress",this._onKeyPressDelegate);
this._initializeKeyboardNavigationSettings();
if(this._owner._activeRowIndex){var e=this._owner.get_dataItems();
if(e.length>0){var c=parseInt(this._owner._activeRowIndex);
var a=e[c];
if(a){this._setActiveRow(a.get_element());
}}}if(this._owner._shouldFocusOnPage){try{this._owner._shouldFocusOnPage=false;
b.focus();
}catch(d){}}this._initializeSubmitControls();
this._focusControlInEditForm();
}},dispose:function(){this._cleanUp();
Telerik.Web.UI.TreeListKeyboardNavigation.callBaseMethod(this,"dispose");
},_cleanUp:function(){this._submitElements=[];
this._itemForFocusedControl=null;
this._isInsertFormFocused=false;
this._isFocusKeyPressed=false;
this._insertDeleteHandled=false;
this._startRangeIndex=null;
this._detachKeyHandlers();
Telerik.Web.UI.RadTreeList.RestoreDocumentEvents();
},_detachKeyHandlers:function(){if(this._documentKeyDownDelegate){$removeHandler(document,"keydown",this._documentKeyDownDelegate);
this._documentKeyDownDelegate=null;
}if(this._onKeyDownDelegate){this._onKeyDownDelegate=null;
}if(this._onKeyPressDelegate){this._onKeyPressDelegate=null;
}},_initializeSubmitControls:function(){this._submitElements=[{tagName:"input",attributes:{type:"text"},submit:true}];
},_focusControlInEditForm:function(){var a=this._owner._controlToFocus;
if(this._owner.get_allowKeyboardNavigation()&&a!=null&&a!=""){setTimeout(function(){try{var d=false;
var b=$find(a);
if(b==null){b=$get(a);
}else{d=true;
}if(b==null){b=document.getElementsByName(a.replace(/_/ig,"$"))[0];
}if(b!=null){if(b.focus){b.focus();
}else{if(d){if(b._focused!=undefined){b._focused=true;
}if(b.setFocus){b.setFocus();
}}}if(b.select){b.select();
}}}catch(c){}},0);
}},_initializeKeyboardNavigationSettings:function(){var a=this._owner._clientSettings._keyboardNavigationSettings;
var b;
if(!a){a=this._owner._clientSettings._keyboardNavigationSettings={};
}if(a._focusKey===b){a._focusKey=89;
}if(a._expandChildItemsKey===b){a._expandChildItemsKey=39;
}if(a._collapseChildItemsKey===b){a._collapseChildItemsKey=37;
}if(a._deleteActiveRowKey===b){a._deleteActiveRowKey=127;
}if(a._exitEditInsertModeKey===b){a._exitEditInsertModeKey=27;
}if(a._initInsertKey===b){a._initInsertKey=73;
}a._navigateUpKey=38;
a._navigateDownKey=40;
a._pageUpKey=33;
a._pageDownKey=34;
a._spaceKey=32;
a._enterKey=13;
},_shouldFocusTreeListOnDocumentKeyDown:function(c,b){var a=this._owner._clientSettings._keyboardNavigationSettings;
return this._owner._clientSettings._allowKeyboardNavigation&&c.ctrlKey&&b==a._focusKey;
},_documentKeyDown:function(b){b=b||window.event;
this._isFocusKeyPressed=false;
var a=b.keyCode||b.charCode;
if(this._shouldFocusTreeListOnDocumentKeyDown(b,a)){if(this._owner.get_element().focus){this._isFocusKeyPressed=true;
this._owner.get_element().focus();
}}},_onKeyDownHandler:function(f){var d=f.keyCode||f.charCode;
var g=(d==this._owner._clientSettings._keyboardNavigationSettings._deleteActiveRowKey);
var a=(d==this._owner._clientSettings._keyboardNavigationSettings._initInsertKey);
if(g||(a&&!f.shiftKey)){this._insertDeleteHandled=true;
this._raiseKeyPressInternal(f);
}var b=(d>=37&&d<=40);
var c=(d==this._owner._clientSettings._keyboardNavigationSettings._pageUpKey||d==this._owner._clientSettings._keyboardNavigationSettings._pageDownKey);
if(((Sys.Browser.agent==Sys.Browser.InternetExplorer||$telerik.isChrome||$telerik.isSafari)&&(b||c))||(($telerik.isChrome||$telerik.isSafari)&&d==this._owner._clientSettings._keyboardNavigationSettings._exitEditInsertModeKey)){this._raiseKeyPressInternal(f);
}},_onKeyPressHandler:function(a){if(($telerik.isFirefox||$telerik.isOpera)&&(this._insertDeleteHandled==true)){this._insertDeleteHandled=false;
return;
}this._raiseKeyPressInternal(a);
},_raiseKeyPressInternal:function(d){var c=d.keyCode||d.charCode;
if(!this._owner._canRaiseItemEvent(d)&&c!=this._owner._clientSettings._keyboardNavigationSettings._exitEditInsertModeKey&&c!=this._owner._clientSettings._keyboardNavigationSettings._enterKey){return;
}var a=this._getAction(d);
var b=Telerik.Web.UI.TreeListKeyBoardNavigationType;
var f=(a==b.NavigateDown||a==b.NavigateUp);
if((f||a==b.Select)&&d.shiftKey||(f&&d.ctrlKey)){if(this._startRangeIndex==null){this._startRangeIndex=this._owner._activeRowIndex;
}}else{this._startRangeIndex=null;
}var g=new Telerik.Web.UI.TreeListKeyPressEventArgs(d,a,this._isFocusKeyPressed,this._owner._clientSettings._keyboardNavigationSettings._focusKey);
this._owner.raise_keyPress(g);
if(g.get_cancel()){return;
}this._handleTreeListKeyboardAction(d,a);
},_handleTreeListKeyboardAction:function(c,b){var a=Telerik.Web.UI.TreeListKeyBoardNavigationType;
switch(b){case a.NavigateDown:this._handleNavigateDown(c);
break;
case a.NavigateUp:this._handleNavigateUp(c);
break;
case a.Expand:case a.Collapse:this._handleExpandCollapse(c);
break;
case a.PageUp:this._handlePageUp(c);
break;
case a.PageDown:this._handlePageDown(c);
break;
case a.Select:if(this._owner._selection){if(this._owner._data&&this._owner._data._allowMultiItemSelection){this._handleMultiSelection(c);
break;
}else{this._handleSingleSelection(c);
break;
}}case a.Edit:this._handleEdit(c);
break;
case a.Cancel:this._handleExitEditInsert(c);
break;
case a.InitInsert:this._handleInitInsert(c);
break;
case a.Delete:this._handleDelete(c);
break;
case a.Update:this._handleUpdate(c);
break;
case a.Insert:this._handleInsert(c);
break;
case a.RootInsert:this._handleRootInsert(c);
break;
default:}},_getAction:function(c){var a=null;
var b=c.keyCode||c.charCode;
if(b==this._owner._clientSettings._keyboardNavigationSettings._navigateDownKey){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.NavigateDown;
}else{if(b==this._owner._clientSettings._keyboardNavigationSettings._navigateUpKey){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.NavigateUp;
}else{if(b==this._owner._clientSettings._keyboardNavigationSettings._collapseChildItemsKey){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.Collapse;
}else{if(b==this._owner._clientSettings._keyboardNavigationSettings._expandChildItemsKey){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.Expand;
}else{if(b==this._owner._clientSettings._keyboardNavigationSettings._pageUpKey){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.PageUp;
}else{if(b==this._owner._clientSettings._keyboardNavigationSettings._pageDownKey){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.PageDown;
}else{if(this._shouldSelectOnSpace(c,b)){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.Select;
}else{if(b==this._owner._clientSettings._keyboardNavigationSettings._enterKey){a=this._determineActionForEnter(c);
}else{if(b==this._owner._clientSettings._keyboardNavigationSettings._exitEditInsertModeKey){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.Cancel;
}else{if(b==this._owner._clientSettings._keyboardNavigationSettings._initInsertKey){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.InitInsert;
}else{if(b==this._owner._clientSettings._keyboardNavigationSettings._deleteActiveRowKey){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.Delete;
}}}}}}}}}}}return a;
},_shouldSelectOnSpace:function(b,a){if(a==this._owner._clientSettings._keyboardNavigationSettings._spaceKey&&this._owner._clientSettings._selecting&&this._owner._clientSettings._selecting._allowItemSelection){return true;
}return false;
},_determineActionForEnter:function(f){var a=Telerik.Web.UI.TreeListKeyBoardNavigationType.Edit;
if(this._owner._clientSettings._keyboardNavigationSettings._allowSubmitOnEnter){var c=this.getTargetElement(f);
var b=this._canSubmit(c);
if(b){var d=this._getFocusedFormType(c);
var g=Telerik.Web.UI.TreeListFormItemType;
switch(d){case g.EditForm:a=Telerik.Web.UI.TreeListKeyBoardNavigationType.Update;
break;
case g.InsertForm:a=Telerik.Web.UI.TreeListKeyBoardNavigationType.Insert;
break;
case g.RootInsertForm:a=Telerik.Web.UI.TreeListKeyBoardNavigationType.RootInsert;
break;
default:a=null;
}}else{if(c===this._owner.get_element()){if(this._owner._activeRow){var h=this._getActiveRowItem();
this._itemForFocusedControl=h;
if(h.get_isInEditMode()){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.Update;
}else{if(h.get_isChildInserted()){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.Insert;
}}}else{if(this._owner.get_isItemInserted()){a=Telerik.Web.UI.TreeListKeyBoardNavigationType.RootInsert;
}}}}}return a;
},_getFocusedFormType:function(a){var d=this._getParentItemForElement(a);
if(d!=null){this._itemForFocusedControl=d;
var b=d.get_isInEditMode();
var c=d.get_isChildInserted();
if(b&&c){return this._isInsertFormFocused?Telerik.Web.UI.TreeListFormItemType.InsertForm:Telerik.Web.UI.TreeListFormItemType.EditForm;
}else{if(b){return Telerik.Web.UI.TreeListFormItemType.EditForm;
}else{if(c){return Telerik.Web.UI.TreeListFormItemType.InsertForm;
}}}return null;
}else{if(this._owner.get_isItemInserted()&&this._isRootInsertItemFocused(a)){return action=Telerik.Web.UI.TreeListFormItemType.RootInsertForm;
}}return null;
},_canSubmit:function(f){var c=true;
var e=false;
for(var a=0;
a<this._submitElements.length;
a++){var b=this._submitElements[a];
if(b.tagName&&b.tagName.toLowerCase()!==f.tagName.toLowerCase()){continue;
}if(b.attributes){var g=true;
for(var d in b.attributes){if(d==="class"){g=f.className.indexOf(b.attributes[d])>-1;
}else{g=f[d]===b.attributes[d];
}if(!g){break;
}}if(!g){continue;
}}c=c&&!!b.submit;
e=true;
if(!c){return false;
}}if(!e){c=false;
}return c;
},_validateEditInsertForm:function(a){if(this._owner._validationSettings._enableValidation){var c=this._owner._validationSettings._commandsToValidate;
if(c.toString().indexOf(a)>-1){var d=this._owner._validationSettings._validationGroup;
if(typeof(Page_ClientValidate)=="function"){var b=Page_ClientValidate(d);
if(b!=true){return false;
}}}}return true;
},_handleEdit:function(a){if(this._owner._activeRow&&this._owner._canRaiseItemEvent(a)){var b=this._getActiveRowItem();
if(!b.get_isInEditMode()){this._owner.fireCommand("Edit",b.get_displayIndex());
}}$telerik.cancelRawEvent(a);
},_handleUpdate:function(a){if(this._itemForFocusedControl&&this._validateEditInsertForm("Update")){this._owner.fireCommand("Update",this._itemForFocusedControl.get_displayIndex());
}$telerik.cancelRawEvent(a);
},_handleInsert:function(a){if(this._itemForFocusedControl&&this._validateEditInsertForm("PerformInsert")){this._owner.fireCommand("PerformInsert",this._itemForFocusedControl.get_displayIndex());
}$telerik.cancelRawEvent(a);
},_handleRootInsert:function(a){if(this._validateEditInsertForm("PerformInsert")){this._owner.fireCommand("PerformInsert");
}$telerik.cancelRawEvent(a);
},_handleDelete:function(a){if(this._owner._activeRow){var b=this._getActiveRowItem();
this._owner.fireCommand("Delete",b.get_displayIndex());
}$telerik.cancelRawEvent(a);
},_handleExitEditInsert:function(d){var b=this.getTargetElement(d);
var a=this._canSubmit(b);
if(a){var c=this._getFocusedFormType(b);
var f=Telerik.Web.UI.TreeListFormItemType;
switch(c){case f.EditForm:if(this._itemForFocusedControl){this._owner.fireCommand("Cancel",this._itemForFocusedControl.get_displayIndex());
}break;
case f.InsertForm:if(this._itemForFocusedControl){this._owner.fireCommand("CancelInsert",this._itemForFocusedControl.get_displayIndex());
}break;
case f.RootInsertForm:this._owner.fireCommand("CancelInsert");
break;
default:}}else{if(b===this._owner.get_element()){if(this._owner._activeRow){var g=this._getActiveRowItem();
if(g.get_isInEditMode()){this._owner.fireCommand("Cancel",g.get_displayIndex());
}else{if(g.get_isChildInserted()){this._owner.fireCommand("CancelInsert",g.get_displayIndex());
}else{if(this._owner.get_isItemInserted()){this._owner.fireCommand("CancelInsert");
}}}}else{if(this._owner.get_isItemInserted()){this._owner.fireCommand("CancelInsert");
}}}}$telerik.cancelRawEvent(d);
},_handleInitInsert:function(a){if(this._owner._activeRow&&a.ctrlKey){var b=this._getActiveRowItem();
if(b&&!b.get_isChildInserted()){this._owner.fireCommand("InitInsert",b.get_displayIndex());
}}else{if(a.shiftKey&&!this._owner.get_isItemInserted()){this._owner.fireCommand("InitInsert");
}}$telerik.cancelRawEvent(a);
},_handleSingleSelection:function(a){if(this._owner._activeRow){var b=this._getActiveRowItem();
if(this._owner._clientSettings._selecting._allowToggleSelection){this._toggleSelection(b);
}else{if(!b.get_selected()){this._owner.selectItem(b);
}}$telerik.cancelRawEvent(a);
}},_toggleSelection:function(a){if(a.get_selected()){this._owner.deselectItem(a);
}else{this._owner.selectItem(a);
}},_handleMultiSelection:function(f){if(this._owner._activeRow){var d=this._getActiveRowItem();
if(f.ctrlKey){this._toggleSelection(d);
}else{if(f.shiftKey){var c=this._getActiveRowItem();
this._performRangeSelection(c);
}else{var a=this._owner.get_selectedItems();
for(var b=0;
b<a.length;
b++){var c=a[b];
if(c.get_displayIndex()!=d.get_displayIndex()){this._owner.deselectItem(c);
}}if(this._owner._clientSettings._selecting._allowToggleSelection){this._toggleSelection(d);
}else{if(!d.get_selected()){this._owner.selectItem(d);
}}}}$telerik.cancelRawEvent(f);
}},_selectItemsInRange:function(a,c){var d=this._owner.get_dataItems();
for(var b=a;
b<=c;
b++){this._owner.selectItem(d[b]);
}},_performRangeSelection:function(a){if(this._startRangeIndex!==0&&!this._startRangeIndex){return;
}this._owner.deselectAllItems();
if(this._startRangeIndex>a.get_displayIndex()){this._selectItemsInRange(a.get_displayIndex(),this._startRangeIndex);
}else{this._selectItemsInRange(this._startRangeIndex,a.get_displayIndex());
}},_handleNavigateDown:function(c){var a=this._getNextActiveRow();
if(a){if(this._owner._activeRow){this._clearActiveRowCssClass();
}if(!c.ctrlKey&&!c.shiftKey&&this._owner._selection){var b=$find(a.id);
this._owner.deselectAllItems();
this._owner.selectItem(b);
}if(c.shiftKey&&this._owner._selection&&this._owner._data._allowMultiItemSelection){var b=$find(a.id);
this._performRangeSelection(b);
}this._setActiveRow(a);
}$telerik.cancelRawEvent(c);
},_handleNavigateUp:function(c){var b=this._getPreviousActiveRow();
if(b){if(this._owner._activeRow){this._clearActiveRowCssClass();
}if(!c.ctrlKey&&!c.shiftKey&&this._owner._selection){var a=$find(b.id);
this._owner.deselectAllItems();
this._owner.selectItem(a);
}if(c.shiftKey&&this._owner._selection&&this._owner._data._allowMultiItemSelection){var a=$find(b.id);
this._performRangeSelection(a);
}this._setActiveRow(b);
}$telerik.cancelRawEvent(c);
},_handleExpandCollapse:function(c){if(this._owner._activeRow){var a=this._getActiveRowItem();
var b=c.keyCode||c.charCode;
if((b==this._owner._clientSettings._keyboardNavigationSettings._expandChildItemsKey&&a.get_expanded())||(b==this._owner._clientSettings._keyboardNavigationSettings._collapseChildItemsKey&&!a.get_expanded())){$telerik.cancelRawEvent(c);
return;
}this._owner.fireCommand("ExpandCollapse",a.get_displayIndex());
}$telerik.cancelRawEvent(c);
},_handlePageUp:function(c){var b=null;
var a=null;
b=this._owner.get_currentPageIndex();
a=this._owner.get_pageCount();
b++;
if(b<a){this._owner._shouldFocusOnPage=true;
this._owner.updateClientState();
this._owner.page("Next");
}$telerik.cancelRawEvent(c);
},_handlePageDown:function(a){var b=null;
b=this._owner.get_currentPageIndex();
b--;
if(b>-1){this._owner._shouldFocusOnPage=true;
this._owner.updateClientState();
this._owner.page("Prev");
}$telerik.cancelRawEvent(a);
},_getNextActiveRow:function(){var d=this._owner.get_dataItems();
var c;
if(this._owner._activeRow){c=this._getActiveRowItem();
}else{if(this._owner._selection&&this._owner._selectedIndexes.length>0){return d[this._owner._selectedIndexes[0]].get_element();
}return d[0].get_element();
}var b=parseInt(c.get_displayIndex());
var a=b+1;
if(a==d.length&&this._owner._clientSettings._keyboardNavigationSettings._allowActiveRowCycle){return d[0].get_element();
}var e=d[a];
if(e){return e.get_element();
}else{return null;
}},_getPreviousActiveRow:function(){var e=this._owner.get_dataItems();
var d;
if(this._owner._activeRow){d=this._getActiveRowItem();
}else{if(this._owner._selection&&this._owner._selectedIndexes.length>0){return e[this._owner._selectedIndexes[0]].get_element();
}return e[0].get_element();
}var c=parseInt(d.get_displayIndex());
if(c==0){if(this._owner._clientSettings._keyboardNavigationSettings._allowActiveRowCycle){return e[e.length-1].get_element();
}}var b=c-1;
var a=e[b];
if(a){return a.get_element();
}else{return null;
}},_clearActiveRowCssClass:function(){var a=this._owner._activeRow.className;
a=a.replace("rtlRActive","").replace(/^\s+|\s+$/g,"");
this._owner._activeRow.className=a;
},_setActiveRow:function(a){this._owner._activeRow=a;
var c=$find(this._owner._activeRow.id);
if(!c){var d=this._owner.get_dataItems();
c=$find(this._owner._activeRow.id);
}this._owner._activeRowIndex=c.get_displayIndex();
var b=this._owner._activeRow.className+" rtlRActive";
b=b.replace(/^\s+|\s+$/g,"");
this._owner._activeRow.className=b;
},_getActiveRowItem:function(){return $find(this._owner._activeRow.id);
},_getParentItemForElement:function(a){var c=new RegExp("^"+this._owner.get_id()+".*__\\d$");
if(this._owner._isInPlaceEditMode){while(a&&a.parentNode&&a.id!=this._owner.get_id()){if(a.tagName.toLowerCase()=="tr"&&c.test(a.id)){return $find(a.id);
}a=a.parentNode;
}}else{while(a&&a.parentNode&&a.id!=this._owner.get_id()){if(a.tagName.toLowerCase()=="tr"&&!a.id){var b=a.previousSibling;
if(!b){a=a.parentNode;
continue;
}if(b&&c.test(b.id)){return $find(a.previousSibling.id);
}else{if(b.previousSibling&&c.test(b.previousSibling.id)){this._isInsertFormFocused=true;
return $find(b.previousSibling.id);
}}}a=a.parentNode;
}}return null;
},_isRootInsertItemFocused:function(a){var b=new RegExp("^"+this._owner.get_id()+".*__0$");
while(a&&a.parentNode&&a.id!=this._owner.get_id()){if(a.tagName.toLowerCase()=="tr"&&a.nextSibling&&b.test(a.nextSibling.id)){return true;
}a=a.parentNode;
}return false;
},getTargetElement:function(a){a=a||window.event;
return a.target||a.srcElement;
},get_owner:function(){return this._owner;
},set_owner:function(a){this._owner=a;
}};
Telerik.Web.UI.TreeListKeyboardNavigation.registerClass("Telerik.Web.UI.TreeListKeyboardNavigation",Sys.Component);
Telerik.Web.UI.TreeListKeyBoardNavigationType=function(){};
Telerik.Web.UI.TreeListKeyBoardNavigationType.prototype={None:0,NavigateUp:1,NavigateDown:2,Expand:3,Collapse:4,PageUp:5,PageDown:6,Select:7,Edit:8,Cancel:9,InitInsert:10,Delete:11,Update:12,Insert:13,RootInsert:14};
Telerik.Web.UI.TreeListKeyBoardNavigationType.registerEnum("Telerik.Web.UI.TreeListKeyBoardNavigationType");
Telerik.Web.UI.TreeListFormItemType=function(){};
Telerik.Web.UI.TreeListFormItemType.prototype={InsertForm:0,EditForm:1,RootInsertForm:2};
Telerik.Web.UI.TreeListFormItemType.registerEnum("Telerik.Web.UI.TreeListFormItemType");
Telerik.Web.UI.TreeListKeyPressEventArgs=function(b,a,c,d){Telerik.Web.UI.TreeListKeyPressEventArgs.initializeBase(this);
this._keyCode=(c&&a==null)?d:b.keyCode||b.charCode;
this._isShiftPressed=b.shiftKey;
this._isCtrlPressed=b.ctrlKey;
this._isAltPressed=b.altKey;
this._domEvent=b;
this._navigationType=a;
};
Telerik.Web.UI.TreeListKeyPressEventArgs.prototype={get_keyCode:function(){return this._keyCode;
},get_isShiftPressed:function(){return this._isShiftPressed;
},get_isCtrlPressed:function(){return this._isCtrlPressed;
},get_isAltPressed:function(){return this._isAltPressed;
},get_domEvent:function(){return this._domEvent;
},get_keyboardNavigationType:function(){return this._navigationType;
},set_keyboardNavigationType:function(a){this._navigationType=a;
}};
Telerik.Web.UI.TreeListKeyPressEventArgs.registerClass("Telerik.Web.UI.TreeListKeyPressEventArgs",Sys.CancelEventArgs);