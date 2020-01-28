const plugin = require("kgrabber-plugin"),
	site = require("./site"),
	steps = require("./steps"),
	exporters = require("./exporters");

plugin.init(() => {
	plugin.addSites(site);
	plugin.addSteps(steps);
	plugin.addExporters(...exporters);
});
