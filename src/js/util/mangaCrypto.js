const log = require("./log");

let scriptsLoaded = false;

function loadScript(name) {
	$(`<script src="${location.origin}/Scripts/${name}.js" />`)
		.appendTo("head");
}

// TODO load scripts asynchronously
// loads the scripts kissmanga uses to decrypt their links
function loadScripts() {
	if (!scriptsLoaded) {
		loadScript("ca");
		loadScript("lo");
		log.log("loading scripts");
		scriptsLoaded = true;
	}
}

exports.decrypt = (encrypted) => {
	loadScripts();
	return unsafeWindow.wrapKA(encrypted);
};

unsafeWindow.lul = exports.decrypt;
