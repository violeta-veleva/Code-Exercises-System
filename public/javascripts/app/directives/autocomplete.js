testsystem.directive('autoComplete', function() {
  return function(scope, element){
     element.autocomplete({
         source : "/autocomplete",
         html : true,
         messages: {
             noResults: '',
             results: function() {}
         },
         focus : function(item){

         }, 
         open : function() { $('.ui-autocomplete').width(585); }
     }).data('ui-autocomplete')._renderItem = function(ul, item){
      
         return $( "<li style='width : 585px;'></li>" )
             .data( "item.autocomplete", item )
             .append( $( "<a></a>" )[ this.options.html ? "html" : "text" ]( item.label ) )
             .appendTo( ul );

     };                        
  }
});