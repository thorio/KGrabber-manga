/**
 * @typedef {import("kgrabber-types/Status")} Status
 */

const Exporter = require("kgrabber-types/Exporter"),
	CustomLinkTypes = require("../types/CustomLinkTypes"),
	plugin = require("kgrabber-plugin");

module.exports = new Exporter({
	name: "list",
	extension: "txt",
	requireSamePage: true,
	linkTypes: [CustomLinkTypes.IMAGE_SEQUENCE],
}, runExport);

/**
 * @param {Status} status
 * @returns {String}
 */
function runExport(status) {
	let listing = plugin.ui.page.episodeList();
	let str = "";
	for (let episode of status.episodes) {
		if (!episode.error) {
			let images = episode.functionalLink.split("|");
			let innerStr = `# ${listing[episode.episodeNumber].innerText}\n`;
			for (let image of images) {
				innerStr += image + "\n";
			}
			str += innerStr + "\n";
		}
	}
	return str;
}
