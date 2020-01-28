/**
 * @typedef {import("kgrabber-types/Status")} Status
 */

const util = require("./util"),
	plugin = require("kgrabber-plugin");

const linkRegexp = /lstImages\.push\(wrapKA\("(.+)"\)\);/g;

/**
 * @param {Status} status
 */
exports.mangaBegin = async (status) => {
	const linkDisplay = plugin.ui.linkDisplay;

	linkDisplay.show();
	linkDisplay.showSpinner();
	let progress = 0;
	let func = async (episode) => {
		let html = (await util.ajax.get(episode.kissLink + `&s=${status.serverID}`)).response;
		let imageUrls = [];
		for (let match of html.matchAll(linkRegexp)) {
			imageUrls.push(util.mangaCrypto.decrypt(match[1]));
		}

		episode.grabbedLink = imageUrls.join("|");
		progress++;
		linkDisplay.setSpinnerText(`${progress}/${promises.length}`);
	};
	let promises = [];
	for (let episode of status.episodes) {
		promises.push(func(episode));
	}
	linkDisplay.setSpinnerText(`0/${promises.length}`);
	await Promise.all(promises);
	status.func = "defaultFinished";
	plugin.statusManager.save();
	linkDisplay.load();
};
