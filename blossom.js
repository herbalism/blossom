define(['less', 'when'], function(less, when) {

    function extractId(href) {
	return href.replace(/^[a-z]+:\/\/?[^\/]+/, '' )  // Remove protocol & domain
            .replace(/^\//,                 '' )  // Remove root /
            .replace(/\?.*$/,               '' )  // Remove query
            .replace(/\.[^\.\/]+$/,         '' )  // Remove file extension
            .replace(/[^\.\w-]+/g,          '-')  // Replace illegal characters
            .replace(/\./g,                 ':'); // Replace dots with colons(for valid id)
    };

    function styleTitle(name) {
	"less:" +extractId(name);
    };

    function createCSS(styles, name) {
	var css;

	var cleanName = name.replace(/\?.*$/, '');
	var id = styleTitle(cleanName);

	// If the stylesheet doesn't exist, create a new node
	if ((css = document.getElementById(id)) === null) {
            css = document.createElement('style');
            css.type = 'text/css';
        //    if( sheet.media ){ css.media = sheet.media; }
            css.id = id;
	    css.title= id;
            var nextEl = null;
            document.getElementsByTagName('head')[0].insertBefore(css, nextEl);
	}

	if (css.styleSheet) { // IE
            try {
		css.styleSheet.cssText = styles;
            } catch (e) {
		throw new(Error)("Couldn't reassign styleSheet.cssText.");
            }
	} else {
            (function (node) {
		if (css.childNodes.length > 0) {
                    if (css.firstChild.nodeValue !== node.nodeValue) {
			css.replaceChild(node, css.firstChild);
                    }
		} else {
                    css.appendChild(node);
		}
            })(document.createTextNode(styles));
	}
    }

    less.Parser.importer = function() {
	console.log("import: ", arguments);
    };

    return {
	styleTitle: styleTitle,
	load: function(name, req, loaded, config) {
	    req(['text!'+name], function(sheet) {
		new(less.Parser)({
		    optimization: less.optimization,
		    paths: ["text!"+name.replace(/[\w\.-]+$/, '')],
		    mime: 'stylesheet/less',
		    filename: name,
		    'contents': {},    // Passing top importing parser content cache ref down.
		    dumpLineNumbers: less.dumpLineNumbers
		}).parse(sheet, function (e, root) {
		    if (e) {
			console.log("Error: ", e, name);
		    }
		    createCSS(root.toCSS(), name);
		    loaded(sheet);
		    console.log("sheet: ",sheet);
		});
	    });
	}
    }
});



