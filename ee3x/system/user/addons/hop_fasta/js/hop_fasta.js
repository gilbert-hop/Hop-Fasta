$(document).ready(function(){
	if (window.location.href.indexOf('design/template') > -1)
	{
		$(".wrap form[action*='design/template/edit']").addClass('fasta');

		$("form.fasta .form-ctrls").prepend('<button id="fasta_update" class="btn" value="update" data-submit-text="Quick Update" data-work-text="Saving...">Quick Update</button><span id="fasta_status" style="display:none;"></span>');
		
		$("#fasta_update").click(function(){

			// Update button state
			$('#fasta_update').attr('disabled', 'disabled');
			$('#fasta_update').addClass('work');
			$('#fasta_update').html($('#fasta_update').data('work-text'));
			
			// Get correct template data
			if (typeof $("form.fasta textarea[name='template_data']").data("codemirror.editor") === "undefined" || $("form.fasta textarea[name='template_data']").data("codemirror.editor") == false) {
				var temp_data = $("form.fasta textarea[name='template_data']").val();
			} else {
				var temp_data = $("form.fasta textarea[name='template_data']").data("codemirror.editor").getValue();
			}
			
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
			// We replace the default template data field by our fixed template data
			paramObj.template_data = temp_data;

			$.ajax({
				type: "POST",
				url: $("form.fasta").attr('action'),
				data: paramObj,
				dataType: 'json',
				success: function(response){
					// console.log(response);
					
					$('#fasta_update').html($('#fasta_update').data('submit-text'));
					$('#fasta_update').removeAttr('disabled');
					$('#fasta_update').removeClass('work');
					$('#fasta_status').html('OK').show().delay(800).fadeOut();
				},
				error: function(response){
					// console.log('fail');
					// console.log(response);
					
					$('#fasta_update').html($('#fasta_update').data('submit-text'));
					$('#fasta_update').removeAttr('disabled');
					$('#fasta_update').removeClass('work');
					$('#fasta_status').html('Failed').show().delay(1200).fadeOut();
				}
			});
			
			return false;
		});
	}
	
});
