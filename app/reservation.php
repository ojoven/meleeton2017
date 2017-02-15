<?php
require 'vendor/autoload.php';
require 'config.php';

// CALL CLIENT
use Aws\Ses\SesClient;
$client = SesClient::factory(array(
	'credentials' => array(
		'key'    => $amazon['key'],
		'secret' => $amazon['secret']
	),
	'region' => 'us-east-1',
	'version' => '2010-12-01'
));

// We get the params
$params = $_POST;
if (!isset($params['amount']) || !isset($params['name']) || !isset($params['email'])) { // Wooo, such validation!
	die('Nope');
}

// SEND EMAIL
$msg = array();
$msg['Source'] = $email; // Yes, we're sending emails to ourselves
$msg['Destination']['ToAddresses'][] = $email;

$msg['Message']['Subject']['Data'] = "[Mêléeton 2017] Reservar " . $params['amount'] . " plaza(s) para " . $params['name'] . " - " . $params['email'];
$msg['Message']['Subject']['Charset'] = "UTF-8";

$msg['Message']['Body']['Text']['Data'] = "[Mêléeton 2017] Reservar " . $params['amount'] . " plaza(s) para " . $params['name'] . " - " . $params['email'];
$msg['Message']['Body']['Text']['Charset'] = "UTF-8";
$msg['Message']['Body']['Html']['Data'] = "[Mêléeton 2017] Reservar " . $params['amount'] . " plaza(s) para " . $params['name'] . " - " . $params['email'];
$msg['Message']['Body']['Html']['Charset'] = "UTF-8";

try{
	$result = $client->sendEmail($msg);

	//save the MessageId which can be used to track the request
	$msg_id = $result->get('MessageId');
	echo("MessageId: $msg_id");
} catch (Exception $e) {
	//An error happened and the email did not get sent
	echo($e->getMessage());
}