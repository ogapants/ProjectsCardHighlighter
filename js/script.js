window.onload = function() {
	let retryCount = 0
	const intervalTime = 2_000//fixme
	const jsInitCheckTimer = setInterval(jsLoaded, intervalTime)
	function jsLoaded() {
		const cards = document.querySelectorAll("[class^='issue-card project-card position-relative rounded-2 color-shadow-small my-2 mx-0 border ws-normal js-project-column-card js-socket-channel js-updatable-content']")
		retryCount++
		console.log(`PCH/ cards.length:${cards.length}, count:${retryCount}`)

		if(cards.length > 0 || retryCount > 2){
			clearInterval(jsInitCheckTimer)

			cards.forEach(function(card) {
				const repo = card.getAttribute("data-card-repo")
				const color = findHighlightColor(repo)
				card.style.backgroundColor = color
				console.log(`PCH/ repo name:${repo}, color code:${repo}`)
			});
		}
	}
};

let colorsMap
if (typeof myColors === 'undefined') {
	colorsMap = sampleColors
} else {
	colorsMap = myColors
}

function findHighlightColor(repo) {
	const color = colorsMap.get(repo)
	if (color === null) {
		return colorsMap.get("default_color")
	}
	return color
}