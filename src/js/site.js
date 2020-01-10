const { Server, Site, Dictionary } = global.types,
	CustomLinkTypes = require("./CustomLinkTypes");

let servers = new Dictionary([
	new Server("kissmanga", {
		regex: null,
		name: "kissmanga",
		linkType: CustomLinkTypes.IMAGE_SEQUENCE,
		customStep: "not implemented yet",
	}),
]);

module.exports = new Site("kissmanga.com", {
	contentPath: "Manga",
	noCaptchaServer: null,
	buttonColor: "#0481BC",
	buttonTextColor: "#fff",
	servers,
});
