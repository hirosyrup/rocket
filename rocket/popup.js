$(function(){
	$('#btn').on('click', () => {
		chrome.tabs.query({active: true, currentWindow: true}, tabs => {
			chrome.tabs.sendMessage(tabs[0].id, { 'type': 'OPEN_WINDOW', 'url': 'https://google.co.jp' });
		});
	});
});