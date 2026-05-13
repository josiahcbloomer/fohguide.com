module.exports = function (eleventyConfig) {
	// Tell Eleventy to copy your CSS and vanilla JS straight to the build folder
	eleventyConfig.addPassthroughCopy("src/assets")

	return {
		dir: {
			input: "src", // Where you write your templates
			output: "_site", // Where Eleventy spits out the final HTML
			includes: "_includes", // Your layouts (headers, footers)
			data: "_data", // Where we will fetch the Payload API
		},
		// We'll use Nunjucks (.njk) for templates as it's highly readable
		htmlTemplateEngine: "njk",
	}
}