window.onload = () => {
	checkLoadingCards()
};

const paintCards = column => {
	const cards = column.querySelectorAll(".project-card")
	if (cards.length > 0) {
		const colorObj = generateColorObj()
		cards.forEach(card => {
			const repo = card.getAttribute("data-card-repo")
			card.style.backgroundColor = findHighlightColor(colorObj, repo)
			//console.log(`PCH/ repo name:${repo}, color code:${color}`)
		})
	}
}

const checkLoadingCards = () => {
	const columnCards = document.querySelectorAll(".js-project-column-cards")

	const config = {childList: true};
	columnCards.forEach(column => {
		const cards = column.querySelectorAll(".project-card")
		if (cards.length > 0) {
			// ネットをスロットリングすると拡張機能が画面のロード後に実行されるので既に存在する場合は色を付けて終了
			// console.log("already cards exists")
			paintCards(column)
		} else {
			// カードがない場合はまだ読み込まれていないのでObserverを設定する
			// console.log("need to observe")
			const observer = new MutationObserver((mutationsList, observer) => {
				// 初回カードが追加される時はローディングが取り除かれてカードが追加されるため以下のチェックを入れる
				// カードがなくドラッグ＆ドロップされた時はremovedNodesが存在しないのでカードの色を変えない
				if (
					mutationsList[0].removedNodes.length > 0 &&
					mutationsList[0].addedNodes.length > 0
				) {
					paintCards(column)
				}

				// 一回実行したらObserverを停止する
				observer.disconnect()
			});
			observer.observe(column, config)
		}
	})
};

const generateColorObj = () => {
	let colorObj
	if (typeof myColors === "undefined") {
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
	return key
		.toLowerCase()
		.replace(/^/, "[\"")
		.replace(/$/, "\"]")
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
