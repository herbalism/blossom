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

    buster.testCase("blossom", {
	'loads a leaf less-stylesheet': function() {
	    return when(resolve('examples/leaf.less')).then(
		function(value){
		    var styles = document.styleSheets[0];
		    
		    assert.equals("#content", styles.cssRules[0].selectorText);
		}
	    )
	},
	'loads a file that imports a leaf' : function() {
	    var lessToLoad = 'examples/one-import.less';
	    return when(resolve(lessToLoad)).then(
		function(value){
		    var styles = document.styleSheets[0];
		    assert.match(styleList(), [{title: blossom.styleTitle(lessToLoad)}]);
		}
	    )
	}
    });
})
