$(function(){
		
		let listData = {}
		let isAddMode = false;
		const dataKey ='rocketData';
		const tmpKey ='rocketTmpData';
		
		$('.add_button').on('click', function() {
				$('#form_data_id').val('');
				$('#form_title').val('');
				$('#form_url').val('');
				$('#form_class').val('');
				$('#form_regex').val('');
				toAddMode(false);
		});
		
		$('#action_cancel').on('click', function() {
				toIdleMode();
				removeTmpData();
		});
		
		$('#action_save').on('click', function() {
				save($('#form_data_id').val());
				removeTmpData();
		});

		$('#action_delete').on('click', function() {
				remove($('#form_data_id').val());
				removeTmpData();
		});
		
		$('#form_title, #form_url, #form_class, #form_regex').on('blur', function() {
				saveTmpData();
		});

		function updateListData() {
			listData = JSON.parse(localStorage.getItem(dataKey));
			if (listData == null) {
				listData = {};
			}
		}
		
		function updateList() {
			updateListData();
			const listHtml = Object.keys(listData).map(k => {
					const d = listData[k];
					return `<div class='list_row_container' id=${k}><span class='list_row_title'>${d.title}</span><span class='list_row_button'><button class='open_btn'>開く</button></span></div><hr>`
			});
			
			$('#link_list').html(listHtml.join(''));
			$('.list_row_title').on('click', function() {
					if (isAddMode === true) {
						toIdleMode();
					} else {
						const data_id = $(this).closest('.list_row_container').attr("id");
						edit(data_id);
					}
			});
			$('.open_btn').on('click', function() {
					const data_id = $(this).closest('.list_row_container').attr("id");
					const data = listData[data_id];
					chrome.tabs.query({active: true, currentWindow: true}, tabs => {
							chrome.tabs.sendMessage(tabs[0].id, { 'type': 'OPEN_WINDOW', 'url': data.url, 'class': data.class, 'regex': data.regex });
					});
			});
		};
		
		function initView() {
			updateList();
			const tmpData = JSON.parse(localStorage.getItem(tmpKey));
			if (tmpData === null) {
				toIdleMode();
			} else {
				$('#form_title').val(tmpData.title);
				$('#form_url').val(tmpData.url);
				$('#form_class').val(tmpData.class);
				$('#form_regex').val(tmpData.regex);
				toAddMode(false);
			}
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
			$('#form_data_id').val(data_id);
			$('#form_title').val(data.title);
			$('#form_url').val(data.url);
			$('#form_class').val(data.class);
			$('#form_regex').val(data.regex);
			toAddMode(true);
		}
		
		function save(data_id) {
			let edit_id = data_id
			if (edit_id === '') {
				edit_id = createId();
			}
			listData[edit_id] = currentInputData();
			localStorage.setItem(dataKey, JSON.stringify(listData));
			updateList();
			toIdleMode();
		}
		
		function remove(data_id) {
			if (data_id === '') { 
				return; 
			}
			delete listData[data_id];
			localStorage.setItem(dataKey, JSON.stringify(listData));
			updateList();
			toIdleMode();
		}
		
		function createId() {
			return new Date().getTime().toString(16);
		}
		
		function currentInputData() {
			return {
				'title': $('#form_title').val(),
				'url': $('#form_url').val(),
				'class': $('#form_class').val(),
				'regex': $('#form_regex').val()
			};
		}
		
		function saveTmpData() {
			localStorage.setItem(tmpKey, JSON.stringify(currentInputData()));
		}
		
		function removeTmpData() {
			localStorage.removeItem(tmpKey);
		}
		
		initView();
});