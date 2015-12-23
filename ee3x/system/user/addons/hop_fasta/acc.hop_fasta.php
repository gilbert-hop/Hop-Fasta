<?php
/**
 * Hop Fasta Accessory
 *
 * @package			Hop Fasta
 * @version			2.2.0
 * @author			Travis Smith <http://hopstudios.com/software>
 * @copyright 		Copyright (c) 2015 Hop Studios <http://www.hopstudios.com>
 * @license 		Commercial
 * @link			http://www.hopstudios.com/software/versions/hop_fasta
 */

/*

Original code for EE 1.x written by Matthew Callis
Used with permission
https://github.com/MatthewCallis/Fasta/

*/

class hop_fasta_acc 
{
	var $name	 		= 'Hop Fasta';
	var $id	 			= 'hop_fasta';
	var $version	 	= '2.2.0';
	var $description	= 'A Hop Studios Accessory that puts a Quick Update button on the Template editor.';
	var $sections	 	= array();
	var $debug			= false;

	/**
	* Set Sections
	*
	* Set content for the accessory
	*
	* @access	public
	* @return	void
	*/
	function set_sections()
	{
		$EE =& get_instance();

		$group_id = $EE->input->get_post('tgpref');
		
		$session_id = $EE->session->userdata('fingerprint');

		$js =  <<<EOD
<script type="text/javascript">
$(document).ready(function(){

	$("form[action*='update_template']").addClass('fasta');

	$("form.fasta input[value='Update']").before("<input type='submit' class='submit' value='Quick Update' id='fasta_update'/>&nbsp;<em id='working'></em>&nbsp;");
	$("#fasta_update").click(function(){
		$("#working").html("&nbsp;Working...");
		if (typeof $("#template_data").data("codemirror.editor") === "undefined" || $("#template_data").data("codemirror.editor") == false) {
			var temp_data = $("#template_data").val();
		} else {
			var temp_data = $("#template_data").data("codemirror.editor").getValue();
		}
		$.post(
			"index.php?S=$session_id&D=cp&C=design&M=update_template&tgpref=$group_id",
			{
				XID:$("form.fasta input[name='XID']").val(),
				csrf_token:$("form.fasta input[name='csrf_token']").val(),
				template_id:$("form.fasta input[name='template_id']").val(),
				group_id:$("form.fasta input[name='group_id']").val(),
				template_data:temp_data,
				template_notes:$("#template_notes").val(),
				save_template_file:$("form.fasta input[name='save_template_file']").val(),
				save_template_revision:$("form.fasta input[name='save_template_revision']").val(),
				columns:$("#columns").val()
			},function(results){
				$("#working").html("");
				results = jQuery.parseJSON(results);
				if (results.message_success) { $.ee_notice(results.message_success, {type: "success"}) };
				if (results.message_failure) { $.ee_notice(results.message_failure, {type: "error"}) };
			}
		);
		return false;
	});
});</script>
EOD;


		// if group_id doesn't exist, or if the URL contains update_template OR edit_template
		if(!$group_id || (strlen(strstr($_SERVER['REQUEST_URI'],'update_template'))<0) || (strlen(strstr($_SERVER['REQUEST_URI'],'edit_template'))<0)){
			$EE->cp->add_to_head($js);
		}



		$this->sections['Fasta'] = 'A Hop Studios Accessory that puts a Quick Update button on the Template editor.'; 
//		$this->sections[] = '<script type="text/javascript" charset="utf-8">$("#accessoryTabs a.hop_fasta").parent().remove();</script>';
	}
}