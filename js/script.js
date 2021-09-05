window.onload = () => {
	let retryCount = 0
	const intervalTime = 2_000//fixme
	const jsInitCheckTimer = setInterval(() => {
		const cards = document.querySelectorAll("[class^='issue-card project-card position-relative rounded-2 color-shadow-small my-2 mx-0 border ws-normal js-project-column-card js-socket-channel js-updatable-content']")
		retryCount++
		console.log(`PCH/ cards.length:${cards.length}, retryCount:${retryCount}`)
		if(cards.length > 0 || retryCount > 2){
			clearInterval(jsInitCheckTimer)

			const colorObj = generateColorObj()
			cards.forEach(function(card) {
				const repo = card.getAttribute("data-card-repo")
				const color = findHighlightColor(colorObj, repo)
				card.style.backgroundColor = color
				//console.log(`PCH/ repo name:${repo}, color code:${color}`)
			})
		}
	}, intervalTime);
};

const generateColorObj = () => {
	let colorObj
	if (typeof myColors === 'undefined') {
		colorObj = sampleColors
	} else {
		colorObj = myColors
	}
	//console.log(colorObj) //before

	const newObj = {}
	for (let key in colorObj) {
		newObj[convertKey(key)] = colorObj[key]
	}
	console.log(newObj) //after
	return newObj
}

/**
 * Convert from general format to Attribute format.
 * ex: PCH -> ["pch"]
 */
const convertKey = (key) => {
	if (key === "note" || key === "default") {
		//defined keys
		return key
	}
	const lowered = key.toLowerCase()
	const symboled = lowered.replace(/^/, "[\"").replace(/$/, "\"]")
	return symboled;
}

const findHighlightColor = (colorObj, repo) => {
	if (repo === null) {
		//just a note
		return colorObj["note"]
	}
	if (repo in colorObj) {
		//defined repos color
		return colorObj[repo]
	} else {
		//undefined repos color
		return colorObj["default"]
	}
}
