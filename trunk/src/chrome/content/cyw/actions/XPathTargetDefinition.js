with(customizeyourweb){
(function(){
   function XPathTargetDefinition(xPath){
      this.xPath = xPath      
   }
   
   XPathTargetDefinition.prototype = {
      constructor: XPathTargetDefinition,
      
      getXPath: function(){
         return this.xPath
      },

      setXPath: function(xPath){
         this.xPath = xPath
      },
      
      getDefinitionAsString: function(){
         return this.getXPath()
      },

      getDefinitionStyle: function(){
         return TargetDefinitionStyle.XPATH
      },

      getTargets: function(targetWin){
         return XPathUtils.getElements(this.xPath, targetWin.document)
      }         

   }
   
   ObjectUtils.extend(XPathTargetDefinition, "AbstractTargetDefinition", customizeyourweb)
   
   customizeyourweb.Namespace.bindToNamespace("customizeyourweb", "XPathTargetDefinition", XPathTargetDefinition)
})()
}