chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'OPEN_WINDOW') {
			const reg = new RegExp(message.regex);
			const id = $(message.class).text().match(reg);
			if (id === null) {
				alert('IDが見つかりません');
			} else {
				const url = message.url.replace(':id', id[0]);
				window.open(url);
			}
	}
});