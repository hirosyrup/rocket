$(function(){
	const listData = {'werwe': {'title': 'google', 'url': 'https://google.co.jp'}, 'erere': {'title': 'leeap', 'url': 'https://leeap.jp'}}
		const listHtml = Object.keys(listData).map(k => {
			const d = listData[k];
			return `<div class='list_row_container'><span class='list_row_title'>${d.title}</span><span class='list_row_button'><button class='btn'>開く</button></span></div><hr>`
		});
			
	$('#link_list').html(listHtml.join(''));
		
	$('#btn').on('click', () => {
		chrome.tabs.query({active: true, currentWindow: true}, tabs => {
			chrome.tabs.sendMessage(tabs[0].id, { 'type': 'OPEN_WINDOW', 'url': 'https://google.co.jp' });
		});
	});
});