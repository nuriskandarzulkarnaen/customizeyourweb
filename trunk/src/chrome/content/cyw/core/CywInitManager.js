/*
 * customizeyourweb
 * Version 0.1
 * Created by Rudolf No�
 * 25.09.2008
 */

(function(){with(customizeyourweb){
	
   var initPageHandler = {handleEvent: function(event){PageEventHandler.initPage(event)}}
   
	var InitManager = {
		eventHandlersActive: false,
		intializedOnceDone: false,
      prefObserver: null,
		shortcutManager: new ShortcutManager(window, "keydown", true),
      
      disableAll: function(){
         this.initEventHandlers("removeEventListener")
         this.eventHandlersActive = false
         this.shortcutManager.clearAllShortcuts()
         this.getDisableCustomizeYourWebCommand().setAttribute("checked", "true")
      },
      
      enableAll: function(){
		   if(!this.eventHandlersActive){
            this.initEventHandlers("addEventListener")
            this.eventHandlersActive = true
         }
         this.getDisableCustomizeYourWebCommand().setAttribute("checked", "false")
			this.initShortCuts()
      },
      
      getDisableCustomizeYourWebCommand: function(){
         return document.getElementById('customizeyourweb_disableCustomizeYourWeb')
      },
		
		init: function(event){
         this.intializedOnce()
         this.disableAll()
         var disabled = Prefs.getBoolPref("customizeyourweb.disabled")
         if(!disabled){
            this.enableAll()
         }
         this.initPermantentShortCuts()
         this.initUI()
			CywConfig.init()
         StatusbarManager.init()
		},
      
      initUI: function(){
         var hideToolsMenu = CywConfig.getPref("ui.hideToolsMenu")
         var toolsMenuitem = document.getElementById('customizeyourweb_tools_menu') 
         if(hideToolsMenu){
            toolsMenuitem.style.display = "none"
         }else{
            toolsMenuitem.style.display = "block"
         }
      },
      
      intializedOnce: function(){
			if(!this.intializedOnceDone){
   		   this.registerObservers()
   		   this.intializedOnceDone = true
			}
      },
		
		registerObservers: function(){
			//Add preferences-observer
	      this.prefObserver = Utils.createObserverForInterface(InitManager)
	      Utils.registerObserver(CywCommon.PREF_OBSERVER, this.prefObserver)
		},
		
		initEventHandlers: function(addOrRemoveListenerFunction){
         var tabbrowser = document.getElementById("content"); // tabbrowser
         
         //load event listener
//         tabbrowser[addOrRemoveListenerFunction]("DOMContentLoaded", initPageHandler, true);
         //TODO change back
         tabbrowser[addOrRemoveListenerFunction]("DOMContentLoaded", initPageHandler, false);
         tabbrowser[addOrRemoveListenerFunction]("pageshow", initPageHandler, false);
		},
      
      initPermantentShortCuts: function(){
         this.setShortcut("customizeyourweb.keys.openConfiguration",  EventHandler.openConfiguration, EventHandler)
      },   
		
		initShortCuts: function (){
			this.shortcutManager.clearAllShortcuts()
			var prefix = "customizeyourweb.keys."
			this.setShortcut(prefix+"blurActiveElement",  EventHandler.blurActiveElement, EventHandler)			
			this.setShortcut(prefix+"toggleEditMode",  EditScriptHandler.toggleEditMode, EditScriptHandler)
         //TODO remove
         this.shortcutManager.addShortcut("Alt+F2",  "openDialog('chrome://customizeyourweb/content/test/EditTableTest.xul', 'test', 'centerscreen=yes, modal=no')" )
		},
      
		observe: function(){
         this.init()
      },

      setShortcut: function(prefsKey, cmdFunction, cmdThisObj){
			var combinedKeyCode = Prefs.getCharPref(prefsKey);
			if(combinedKeyCode!="0"){
				this.shortcutManager.addShortcut(combinedKeyCode, cmdFunction, cmdThisObj);
			}
		},
		
      toggleEnableDisableAll: function(){
         var disabled = CywConfig.getPref("disabled")
         CywConfig.setPref("disabled", !disabled)
         this.init()
            
      }
	}
	
	customizeyourweb.Namespace.bindToNamespace("customizeyourweb","InitManager", InitManager)

}})()


