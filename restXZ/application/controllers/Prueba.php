<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once( APPPATH.'/libraries/REST_Controller.php' );
use Restserver\libraries\REST_Controller;


class Prueba extends REST_Controller {

  //Importantisimo el constructor para generar los datos
    public function __construct(){

      header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
      header("Access-Control-Allow-Origin: *");

  //generese el constructor
      parent::__construct();
      //cargue la bd y traiga los datos
      $this->load->database();
  }

  public function index(){
    echo "Hola mundo";
  }

  public function obtener_arreglo_get(){
    $arreglo = array('Manzana','Pera' );
  //  echo json_encode($arreglo);
  $this->response($arreglo);

  }

}
