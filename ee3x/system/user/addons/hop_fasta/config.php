<?php

/**
 * Hop 404 Reporter - Config
 *
 * NSM Addon Updater config file.
 *
 * @package		Hop Studios:Hop 404 Reporter
 * @author		Hop Studios, Inc.
 * @copyright	Copyright (c) 2014, Hop Studios, Inc.
 * @link		http://www.hopstudios.com/software/versions/hop_404_reporter
 * @version		0.1
 * @filesource	hop_404_reporter/config.php
 */

$config['name']='Hop Fasta';
$config['version']='2.2.0';
$config['nsm_addon_updater']['versions_xml']='http://www.hopstudios.com/software/versions/hop_fasta';

// Version constant
if (!defined("HOP_FASTA_VERSION")) {
	define('HOP_FASTA_VERSION', $config['version']);
}
