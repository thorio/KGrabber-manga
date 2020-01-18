const { linkDisplay } = global.ui,
	statusManager = global.statusManager,
	util = require("./util");

// eslint-disable-next-line no-unused-vars
exports.mangaBegin = async (status, site) => {
	linkDisplay.show();
	linkDisplay.showSpinner();
	let progress = 0;
	let func = async (episode) => {
		let html = (await util.ajax.get(episode.kissLink + `&s=${status.serverID}`)).response;
		let imageUrls = [];
		let matches = html.matchAll(/lstImages\.push\(wrapKA\("(.+)"\)\);/g);
		for (let match of matches) {
			imageUrls.push(util.mangaCrypto.decrypt(match[1]));
		}

		episode.grabbedLink = imageUrls.join("|");
		console.log(episode);
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
	statusManager.save();
	linkDisplay.load();
};
