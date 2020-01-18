const { Server, Site, Dictionary } = global.types,
	CustomLinkTypes = require("./types/CustomLinkTypes");

let servers = new Dictionary([
	new Server("kissmanga", {
		regex: null,
		name: "kissmanga",
		linkType: CustomLinkTypes.IMAGE_SEQUENCE,
		customStep: "mangaBegin",
	}),
]);

module.exports = new Site("kissmanga.com", {
	contentPath: "Manga",
	noCaptchaServer: null,
	buttonColor: "#0481BC",
	buttonTextColor: "#fff",
	servers,
});
