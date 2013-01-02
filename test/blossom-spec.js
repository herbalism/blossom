define(['blossom', 
	'when', 
	'require'], 
       function(blossom, 
		when, 
		req) {

	   var assert = buster.assert;

	   var resolve = function(name) {
	       var defered = when.defer();
	       blossom.load(name, req, defered.resolve, {});
	       return defered.promise;
	       
	   };

	   var styleList = function() {
	       var styleSheets = [];
	       var sheetIndex = 0;
	       console.log("length", window.document.styleSheets.length);
	       for(sheetIndex = 0; sheetIndex < window.document.styleSheets.length; sheetIndex++) {
		   styleSheets.push({
		       title: window.document.styleSheets[sheetIndex].title 
		   });
	       }
	       return styleSheets;
	   }
	   
	   buster.testCase("blossom", {
	       'loads a leaf less-stylesheet': function() {
		   var lessToLoad = 'examples/leaf.less'
		   return when(resolve(lessToLoad)).then(
		       function(value){
			   console.log(styleList());
			   assert.match([{title: blossom.styleTitle(lessToLoad)}],
				       styleList())
		       }
		   )
	       },
	       'loads a file that imports a leaf' : function() {
		   var lessToLoad = 'examples/one-import.less';
		   return when(resolve(lessToLoad)).then(
		       function(value){
			   console.log(styleList());
			   assert.match([{title: blossom.styleTitle(lessToLoad)}],
				       styleList());
		       }
		   )
	       }
	   });
       })
