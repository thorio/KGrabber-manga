const $ = unsafeWindow.$, // use the jquery instance of the page, not the script
	applicationName = "KGrabberPlugin",
	pluginName = `${GM_info.script.namespace}\\${GM_info.script.name}`;

let pluginID = getPluginID();

module.exports = (loadPluginFunc) => {
	if (!$) {
		console.err(`${pluginName}: jquery not present on the page, can't register plugin`);
		return;
	}
	$(document).on(`${applicationName}/DiscoverRequest`, () => {
		$(document).trigger(`${applicationName}/DiscoverResponse`, { pluginID });
	});
	$(document).on(`${applicationName}/LoadPlugin-${pluginID}`, (e, context) => {
		loadPluginFunc(context);
	});
};

function getPluginID() {
	let id = GM_getValue("pluginID");
	if (!id) {
		id = `${pluginName}\\${Math.random()}`.replace(/ /g, "_");
		GM_setValue("pluginID", id);
	}
	return id;
}
