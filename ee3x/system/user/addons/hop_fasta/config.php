<?php

/**
 * Hop Fasta - Config
 *
 * NSM Addon Updater config file.
 *
 * @package		Hop Studios:Hop Fasta
 * @author		Hop Studios, Inc.
 * @copyright	Copyright (c) 2016, Hop Studios, Inc.
 * @link		http://www.hopstudios.com/software/versions/hop_404_reporter
 * @version		3.0.0
 * @filesource	hop_fasta/config.php
 */

$config['name']='Hop Fasta';
$config['version']='3.0.0';
$config['nsm_addon_updater']['versions_xml']='http://www.hopstudios.com/software/versions/hop_fasta';

// Version constant
if (!defined("HOP_FASTA_VERSION")) {
	define('HOP_FASTA_VERSION', $config['version']);
}
