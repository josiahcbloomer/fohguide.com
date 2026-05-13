module.exports = async function () {
	try {
		// 1. Fetch Articles (Limit 1000 just as an example)
		const articlesReq = await fetch("http://localhost:3000/api/articles?depth=3&limit=1000")
		const articlesData = await articlesReq.json()

		// 2. Fetch Gear Categories
		const gearReq = await fetch("http://localhost:3000/api/gear?limit=100")
		const gearData = await gearReq.json()

		// Return an object that Eleventy can use in our templates
		return {
			articles: articlesData.docs,
			gear: gearData.docs,
		}
	} catch (error) {
		console.error("Failed to fetch from Payload CMS. Is it running?", error)
		return { articles: [], gear: [] }
	}
}