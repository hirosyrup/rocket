$(function(){
		
		let listData = {}
		let isAddMode = false;
		
		$('#btn').on('click', function() {
			chrome.tabs.query({active: true, currentWindow: true}, tabs => {
				chrome.tabs.sendMessage(tabs[0].id, { 'type': 'OPEN_WINDOW', 'url': 'https://google.co.jp' });
			});
		});
		
		$('.add_button').on('click', function() {
				$('#form_title').val('');
				$('#form_url').val('');
				$('#form_class').val('');
				$('#form_regex').val('');
				toAddMode(false);
		});
		
		$('#action_cancel').on('click', function() {
				toIdleMode();
		});
		

		function updateListData() {
			listData = {'werwe': {'title': 'google', 'url': 'https://google.co.jp', 'class': 'aaa', 'regex': '\d{4}'}, 'erere': {'title': 'leeap', 'url': 'https://leeap.jp', 'class': 'bbb', 'regex': '\d{5}'}}
		}
		
		function updateList() {
			updateListData();
			const listHtml = Object.keys(listData).map(k => {
					const d = listData[k];
					return `<div class='list_row_container' id=${k}><span class='list_row_title'>${d.title}</span><span class='list_row_button'><button class='btn'>開く</button></span></div><hr>`
			});
			
			$('#link_list').html(listHtml.join(''));
			$('.list_row_title').on('click', function() {
					if (isAddMode === true) {
						toIdleMode();
					} else {
						const data_id = $(this).parent().attr("id");
						edit(data_id);
					}
			});
		};
		
		function initView() {
			updateList();
			$('#add_form').hide();
			$('.action_container').hide();
		};
		
		function toAddMode(isEdit) {
			$('.add_button').hide();
			$('#add_form').show();
			$('.action_container').show();
			if (isEdit === true) {
				$('#action_delete').show();
			} else {
				$('#action_delete').hide();
			}
			isAddMode = true;
		}
		
		function toIdleMode() {
			$('.add_button').show();
			$('#add_form').hide();
			$('.action_container').hide();
			isAddMode = false;
		}

		function edit(data_id) {
			const data = listData[data_id]
			$('#form_title').val(data.title);
			$('#form_url').val(data.url);
			$('#form_class').val(data.class);
			$('#form_regex').val(data.regex);
			toAddMode(true);
		}
		
		initView();
});