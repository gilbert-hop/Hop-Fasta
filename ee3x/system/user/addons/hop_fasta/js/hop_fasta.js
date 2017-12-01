$(document).ready(function(){
	if (window.location.href.indexOf('design/template') > -1)
	{
		// Setting up form for Template edit page
		$(".wrap form[action*='design/template/edit']").addClass('fasta');

		// Setting up form for Template variables
		// $(".wrap form[action*='design/variables/edit']").addClass('fasta');

		// Setting up form for Template Partials
		// $(".wrap form[action*='design/snippets/edit']").addClass('fasta');

		// Setting up form for Entry edit
		// $(".wrap form[action*='/cp/publish/edit/entry/']").addClass('fasta');

		// This selector works for EE3 and EE4
		$("form.fasta .form-ctrls, form.fasta .form-btns").not('.form-btns-top').prepend('<button id="fasta_update" class="btn" value="update" data-submit-text="Quick Update" data-work-text="Saving...">Quick Update</button><span id="fasta_status" style="display:none;"></span>');

		$("#fasta_update").click(function(){

			var $button = $(this);
			// Update button state
			$button.attr('disabled', 'disabled');
			$button.addClass('work');
			$button.html($button.data('work-text'));

			// Setup all settings from the form
			var paramObj = {};
			$.each($("form.fasta").serializeArray(), function(_, kv) {
				if (paramObj.hasOwnProperty(kv.name)) {
					paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
					paramObj[kv.name].push(kv.value);
				} else {
					paramObj[kv.name] = kv.value;
				}
			});
			// console.log(paramObj);

			// By default, we send our query as json
			var data_type = 'json';

			// Get correct template data
			if (window.location.href.indexOf('design/template') > -1)
			{
				if (typeof $("form.fasta textarea[name='template_data']").data("codemirror.editor") === "undefined" || $("form.fasta textarea[name='template_data']").data("codemirror.editor") == false) {
					var temp_data = $("form.fasta textarea[name='template_data']").val();
				} else {
					var temp_data = $("form.fasta textarea[name='template_data']").data("codemirror.editor").getValue();
				}
				// We replace the default template data field by our fixed template data
				paramObj.template_data = temp_data;
			}

			// Get correct Variable data
			// if (window.location.href.indexOf('design/variables') > -1)
			// {
			// 	if (typeof $("form.fasta textarea[name='variable_data']").data("codemirror.editor") === "undefined" || $("form.fasta textarea[name='variable_data']").data("codemirror.editor") == false) {
			// 		var temp_data = $("form.fasta textarea[name='variable_data']").val();
			// 	} else {
			// 		var temp_data = $("form.fasta textarea[name='variable_data']").data("codemirror.editor").getValue();
			// 	}
			// 	// We replace the default template data field by our fixed template data
			// 	paramObj.variable_data = temp_data;
			// }

			// Get correct Snippet data
			// if (window.location.href.indexOf('design/snippets') > -1)
			// {
			// 	if (typeof $("form.fasta textarea[name='snippet_contents']").data("codemirror.editor") === "undefined" || $("form.fasta textarea[name='snippet_contents']").data("codemirror.editor") == false) {
			// 		var temp_data = $("form.fasta textarea[name='snippet_contents']").val();
			// 	} else {
			// 		var temp_data = $("form.fasta textarea[name='snippet_contents']").data("codemirror.editor").getValue();
			// 	}
			// 	// We replace the default template data field by our fixed template data
			// 	paramObj.snippet_contents = temp_data;
			// }

			// Get correct data when editing entry
			// if (window.location.href.indexOf('publish/edit/entry') > -1)
			// {
			// 	// This is internal EE, not sure what this is about
			// 	paramObj.ee_fv_field = true;
			// 	
			// 	// Get correct data for every RTE fields
			// 	$.each($("form.fasta textarea.has-rte"), function(idx, value) {
			// 		paramObj[$(value).attr('name')] = $(value).prev().html();
			// 	});
			// }
			

			$.ajax({
				type: "POST",
				url: $("form.fasta").attr('action'),
				data: paramObj,
				dataType: data_type,
				success: function(response){
					// console.log(response);

					$button.html($button.data('submit-text'));
					$button.removeAttr('disabled');
					$button.removeClass('work');
					$('#fasta_status').html(' OK').show().delay(800).fadeOut();
				},
				error: function(response){
					// console.log('fail');
					// console.log(response);

					$button.html($button.data('submit-text'));
					$button.removeAttr('disabled');
					$button.removeClass('work');
					$('#fasta_status').html('Failed').show().delay(1200).fadeOut();
				}
			});

			return false;
		});
	}

});
