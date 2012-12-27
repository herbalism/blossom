var config = module.exports;

config["browser tests"] = {
    environment: "browser",
    sources: ["blossom*.js"],
    tests: ["test/*.js"],
    libs: ["modules/curl/src/curl.js", 
	   "modules/less.js/dist/less-1.3.1.js"
	   "loaderconf.js"],
    extensions: [require("buster-amd")]
};


