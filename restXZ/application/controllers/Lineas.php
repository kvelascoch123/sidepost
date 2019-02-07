<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once( APPPATH.'/libraries/REST_Controller.php' );
use Restserver\libraries\REST_Controller;


class Lineas extends REST_Controller {

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

  public function index_get(){

  //  $varianle = "home";
      $query = $this->db->query("SELECT m_product_category_id as id,
                                name as linea,
                                'arrow-dropright' as icono
                                from m_product_category
                                ORDER BY name

  ");
      //sucedio al gun error
      $respuesta = array('error'=> FALSE,
                          'lineas'=>$query->result_array()
                        );
      $this->response($respuesta);
    }



}
