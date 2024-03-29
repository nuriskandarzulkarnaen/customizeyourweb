with(customizeyourweb){
(function(){   
   
   function ShortcutAction (id, targetDefinition){
      this.AbstractTargetedAction(id, targetDefinition)
      //LinkTarget is defined in LinkWrapper
      this.linkTarget = LinkTarget.CURRENT
      this.selectText = true
   }
   
   ShortcutAction.prototype = {
      constructor: ShortcutAction,
      
      getLinkTarget: function(){
         return this.linkTarget
      },
   
      setLinkTarget: function(linkTarget){
         this.linkTarget = linkTarget
      },

      getSelectText: function(){
         return this.selectText
      },

      setSelectText: function(selectText){
         this.selectText = selectText
      },
      
      doActionInternal: function(cywContext){
         this.registerShortcut(cywContext)
      },
      
      /*
       * Only used to determine if "select" is offered in edit dialog
       */
      isEditableField: function(element){
         if(!element || !element.tagName)
            return false
         return element.tagName=="INPUT" && ["text", "password"].indexOf(element.type.toLowerCase())!=-1 ||
               element.tagName=="TEXTAREA"   
      },
      
      performShortcut: function(cywContext){
         if(this.isTargetOptionalAndTargetMissing(cywContext)){
            return
         }
         //This construct enables to log different errors if the fetching of the elements fails
         var element = this.getTargetWithoutError(cywContext)
         if(!element)
            return
            
         //TODO scroll into view if not in visible
         //scrollIntoView scrolls always even it is visible
//         element.scrollIntoView()
         if(DomUtils.isEditableElement(element) && this.selectText && element.select){
            element.select()
            return
         }else{
            element.focus()
         }
         if (element.tagName == "A") {
            (new LinkWrapper(element)).open(this.linkTarget)
            return
         }else{
            var clickAction = new ClickAction(null, this.getTargetDefinition())
            clickAction.doAction(cywContext)
         }
      }      
   }
   
   //Must be set first to set isEditable to return true
   ObjectUtils.extend(ShortcutAction, "AbstractShortcutAction", customizeyourweb)
   ObjectUtils.extend(ShortcutAction, "AbstractTargetedAction", customizeyourweb)
   
   customizeyourweb.Namespace.bindToNamespace("customizeyourweb", "ShortcutAction", ShortcutAction)
   
})()
}