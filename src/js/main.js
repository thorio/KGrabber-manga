const pluginFramework = require("./pluginFramework");

pluginFramework((pluginContext) => {
	global.types = pluginContext.types; // don't want to keep snaking these through to everything
	const site = require("./site");

	pluginContext.addSite(site);
});
