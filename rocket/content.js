chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const reg = new RegExp("\\d{4}");
	const id = $('.customer-name').text().match(reg);
	console.log(id)
	if (message.type === 'OPEN_WINDOW') {

	}
});