<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php' );
use Restserver\libraries\REST_Controller;


class Customer extends REST_Controller {


  public function __construct(){

    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
    header("Access-Control-Allow-Origin: *");


    parent::__construct();
    $this->load->database();

  }


  public function buscar_get( $termino = "no especifico" ){

      // LIKE
      $query = $this->db->query("SELECT a.c_bpartner_id as idCustomer, a.name as nombre, a.name2 as apellido,
a.taxid, 'Customer' as bp_category ,
'Ecuador' as country, b.name as direccion, b.phone as telefono, 'cust_email@gmail.com' as email
FROM c_bpartner a
inner join c_bpartner_location b ON b.c_bpartner_id = a.c_bpartner_id
WHERE a.isactive ='Y'AND taxid is not null AND a.name2 is not null AND a.name like '%".$termino."%'");



      $respuesta = array(
              'error' => FALSE,
              'termino'=> $termino,
              'customers' => $query->result_array()
            );

      $this->response( $respuesta );

    }

    public function config_post(){

      $data = $this->post();

      $insertar = array('id_org' => $data['id_org'] ,
                        'usuario'=> $data['usuario'],
                        'tipo_doc'=> $data['tipo_doc'],
                        'id_doc_ord'=>$data['id_doc_ord'],
                        'id_doc_shipment'=>$data['id_doc_shipment'],
                        'id_customer'=>$data['id_customer'],
                        'pay_met'=>$data['pay_met'],
                        'pay_term'=> $data['pay_term'],
                        'pricelist'=> $data['pricelist'],
                        'costcenter'=> $data['costcenter'],
                        'user1'=> $data['user1'],
                        'user2'=>$data['user2'],
                        'warehouse'=>$data['warehouse']

                        //$this->generate_xml();
                      ); //campo => parametro de la function



     $this->db-> where( 'id' , 1 );

      $this->db->update( 'config_app',$insertar );  //INSERT INTO ordenes ($insertar)
    //  $orden_id = $this->db->insert_id();     //VALUES (id de la ultima insercicon => campo autonumerico)
  // =====================================================



  $this->response( $insertar );

    }


}
