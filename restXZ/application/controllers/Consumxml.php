<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once( APPPATH.'/libraries/REST_Controller.php' );
use Restserver\libraries\REST_Controller;

include(APPPATH.'/libraries/httpful.phar');


class Consumxml extends REST_Controller {

  //Importantisimo el constructor para generar los datos
    public function __construct(){

      header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
      header("Access-Control-Allow-Origin: *");

  //generese el constructor
      parent::__construct();
      //cargue la bd y traiga los datos,,,,,Nunca cambiaria el amor verdadero por un momento de goce, xq ese momento nunca lo guardare en mi corazon
      $this->load->database();
  }

  public function consumirxml_post(){

    //CARGAR XML

    $g_xml=simplexml_load_file('g_xml.xml');
    $this->response($g_xml);

    if (!$g_xml) {
      echo "No cargo el xml";
    }else{

      $openbravo_ws="http://localhost/bmajustes/ws/ec.com.sidesoft.external.interfaces.setInvoiceSale";
      $openbravo_user="Openbravo";
      $openbravo_passwd="openbravo";


      $response = \Httpful\Request::post($openbravo_ws)
		->body($g_xml)
		->authenticateWith($openbravo_user, $openbravo_passwd)
		->sendsXml()
		->send();

	$xml = simplexml_load_string($response);

	$WS_c_invoice_id=(string)$xml->idTransaccion;
	$WS_documentno= (string)$xml->numeroDocumento;
	$WS_ride= (string)$xml->urlRIDE;
	$WS_mensaje=(string)$xml->mensaje;
	$WS_estatus=(string)$xml->estatus;

	//echo $WS_mensaje; exit;
	echo $WS_c_invoice_id.'<br>';
	echo $WS_documentno.'<br>';
	echo $WS_estatus.'<br>';
	echo $WS_mensaje.'<br>';
	echo $WS_ride.'<br>';
  $data_invoice->free();
	$data_invoiceline->free();
    }
    header(sprintf("Location: %s", $insertGoTo));
    exit;
    ob_end_flush();
  }
}
