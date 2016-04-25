<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once PATH_THIRD."hop_fasta/config.php";

class Hop_fasta_ext
{
	var $name 			= 'Hop Fasta';
	var $version		= HOP_FASTA_VERSION;
	var $description	= 'A Hop Studios Accessory that puts a Quick Update button on the Template editor.';
	var $settings_exist = 'n';
	var $docs_url 		= 'http://www.hopstudios.com/software/hop_fasta/docs';
	
	var $settings = array();
	
	function activate_extension()
	{
		$this->settings = array();

		$data = array(
			'class'	 	=> __CLASS__,
			'method'	=> 'add_fasta_button',
			'hook'	  	=> 'cp_js_end',
			'settings'  => serialize($this->settings),
			'priority'  => 10,
			'version'   => $this->version,
			'enabled'   => 'y'
		);

		ee()->db->insert('extensions', $data);
	}
	
	function update_extension($current = '')
	{
		if ($current == '' OR $current == $this->version)
		{
			return FALSE;
		}

		if ($current < '1.0')
		{
			// Update to version 1.0
		}

		ee()->db->where('class', __CLASS__);
		ee()->db->update(
			'extensions',
			array('version' => $this->version)
		);
	}
	
	function disable_extension()
	{
		ee()->db->where('class', __CLASS__);
		ee()->db->delete('extensions');
	}
	
	function add_fasta_button()
	{
		// Load our JS code
		$js = file_get_contents(PATH_THIRD."hop_fasta/js/hop_fasta.min.js");
		
		echo $js;
	}
}
