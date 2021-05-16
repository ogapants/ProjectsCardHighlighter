window.onload = function() {
	var count = 0;
	const jsInitCheckTimer = setInterval(jsLoaded, 2_000);
	function jsLoaded() {
		const cards = document.getElementsByClassName("issue-card project-card position-relative rounded-2 color-shadow-small my-2 mx-0 border ws-normal js-project-column-card js-socket-channel js-updatable-content draggable js-keyboard-movable");
		count++;
		console.log("cards.length:" + cards.length + ", count:" + count)

		if(cards.length > 0 || count > 2){
			clearInterval(jsInitCheckTimer);

			for(var i = 0; i < cards.length; i++){
				const card = cards[i];
				const repo = card.getAttribute("data-card-repo");
				//console.log("repo name:" + repo);
				switch (repo) {
					case null: //just a card
						card.style.backgroundColor = '#FFFFEE';
						break;
					case "[\"ogapants/projectscardhighlighter2\"]":
						card.style.backgroundColor = '#E6F7FF';
						break;
					case "[\"ogapants/projectscardhighlighter2\"]":
						card.style.backgroundColor = '#FFE6E6';
						break;
					default:
						card.style.backgroundColor = '#D3D5D8';
				}
			};
		}
}
};
