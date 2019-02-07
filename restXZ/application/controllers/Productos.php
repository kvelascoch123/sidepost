<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php' );
use Restserver\libraries\REST_Controller;


class Productos extends REST_Controller {


  public function __construct(){

    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
    header("Access-Control-Allow-Origin: *");


    parent::__construct();
    $this->load->database();

  }
  //======== TODOS LOS PRODUCTOS
  public function todos_get( $pagina=0){
    //$desde= 2;
    $pagina = $pagina * 10;

    $query=$this->db->query("SELECT a.m_product_id as codigo, a.name as producto ,
      a.description as
      descripcion, round(b.pricelist,2) as precio_compra, a.m_product_category_id  as
       linea_id,12 as cantidad_iva, a.em_ssrs_m_warehouse_id as almacen
       FROM  m_product as a
       inner join m_productprice as b ON a.m_product_id = b.m_product_id
       where a.isactive = 'Y'  AND b.pricelist >0 LIMIT 10 OFFSET $pagina   "  );

       /// limit 10 offset ".$pagina."
       // al dar el limit el producto se repite dos veces
    $respuesta = array(
        'error'=>FALSE,
        'productos'=> $query->result_array()
    );

    $this->response($respuesta);
  }

  // ====PRODUCTOS POR TIPO (LINEAS)
  public function por_tipo_get( $tipo="" ){

  //  $tipo =strtoupper($tipo);
   $this->response( $tipo, REST_Controller::HTTP_BAD_REQUEST );
    //return;
      if( $tipo == null ){  // => asi solvento el problema del tipo con letra mayuscula
      $respuesta = array(
                    'error' => TRUE,
                    'mensaje' => 'Falta el parámetro de tipo'
                  );
      $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
      return;
    }
        //paginador
  //  $pagina = $pagina*10;

    $query = $this->db->query("SELECT a.m_product_id as codigo,
    a.name as producto, a.m_product_id as codigo,
    a.name as linea, b.m_product_category_id as linea_id , a.description as descripcion,
    round(c.pricelist,2) as precio_compra,12 as cantidad_iva,a.em_ssrs_m_warehouse_id as almacen
     from m_product a
     inner join  m_product_category b on b.m_product_category_id =a.m_product_category_id
     inner join m_productprice  c on a.m_product_id = c.m_product_id
     WHERE  a.isactive='Y' AND c.pricelist>0 AND b.m_product_category_id = '".$tipo."'
     ");

// OFSET => limit #,#

    $respuesta = array(
            'error' => FALSE,
            'productos' => $query->result_array()
          );

    $this->response( $respuesta );

  }


// BUSCAR
public function buscar_get( $termino = "no especifico" ){

    // LIKE
    $query = $this->db->query("SELECT a.m_product_id as codigo,
    a.name as producto, a.m_product_id as codigo,
    a.name as linea, b.m_product_category_id as linea_id , a.description as descripcion,
    round(c.pricelist,2) as precio_compra, 12 as cantidad_iva
     from m_product a
     inner join  m_product_category b on b.m_product_category_id =a.m_product_category_id
     inner join m_productprice  c on a.m_product_id = c.m_product_id
      where a.isactive='Y'AND c.pricelist > 0 AND a.name like '%".$termino."%'  ");

    $respuesta = array(
            'error' => FALSE,
            'termino'=> $termino,
            'productos' => $query->result_array()
          );

    $this->response( $respuesta );

  }




}
