const pluginFramework = require("./pluginFramework");

pluginFramework((pluginContext) => {
	// don't want to keep snaking these through to everything
	global.types = pluginContext.types;
	global.ui = pluginContext.ui;
	global.preferences = pluginContext.preferences;
	global.statusManager = pluginContext.statusManager;

	const site = require("./site"),
		steps = require("./steps");

	pluginContext.addSite(site);
	pluginContext.addSteps(steps);
});
