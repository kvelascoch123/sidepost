<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php' );
use Restserver\libraries\REST_Controller;


class Pedidos extends REST_Controller {


  public function __construct(){

    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
    header("Access-Control-Allow-Origin: *");


    parent::__construct();
    $this->load->database();

  }


  public function realizar_orden_post($token = "0", $id_usuario = "0"){
    //$this->generate_xml();
    //Objeto data donde se alamacenara el post
    $data = $this->post();
    //$this->generate_xml();
    //VALIDACION DEL COSTO Y IVA

    // VALIDACION no hay en el post los parametros
    if( $token == "0" || $id_usuario == "0" ){
      $respuesta = array(
                    'error' => TRUE,
                    'mensaje'=> "Token invalido y/o usuario invalido."
                  );
      $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
      return;
    }
    // VALIDACION no existe nada en los items del objeto data
    if( !isset( $data["items"] ) || strlen( $data['items'] )== 0 ){
      $respuesta = array(
                    'error' => TRUE,
                    'mensaje'=> "Faltan los items en el post"
                  );
      $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
      return;
    }

    //********* AQUI, items, usuario, token***********
    $condiciones = array('id' => $id_usuario, 'token'=> $token );
    $this->db->where( $condiciones );  //
    $query = $this->db->get('login'); //SELECT login Where cumpla las condiciones

    //---- VALIDACION Existio en la DB ---
    $existe = $query->row();   // ECHOOO
    //VALIDACION no existe ni coinciden los id con el token
    if( !$existe ){
      $respuesta = array(
                    'error' => TRUE,
                    'mensaje'=> "Usuario y Token incorrectos"
                  );
      $this->response( $respuesta );
      return;
    }
// ===============================================================
if (!isset($data["total_carrito"]) || !isset($data["ivaTotal"]) || !isset($data["bp_categoryC"]) || !isset($data["nameC"]) || !isset($data["last_nameC"]) || !isset($data["addressC"]) ) {
   $respuesta = array('error' =>TRUE ,
                "mensaje"=> "Faltan agregar datos del Cliente");

                $this->response($respuesta,REST_Controller::HTTP_BAD_REQUEST);
                return;
}
    //******** Usuario y Token son correctos*****
    $this->db->reset_query();

    $insertar = array('usuario_id' => $id_usuario ,
                      'total'=> $data['total_carrito'],
                      'ivatotal'=> $data['ivaTotal'],
                      'subtotal'=>$data['subtotal'],
                      'nombre'=>$data['nameC'],
                      'apellido'=>$data['last_nameC'],
                      'bp_category'=> $data['bp_categoryC'],
                      'tax_id'=> $data['tax_idC'],
                      'direccion'=> $data['addressC'],
                      'telefono'=> $data['phoneC'],
                      'email'=>$data['emailC'],
                      'customer_id'=>$data['id_customerC']

                      //$this->generate_xml();
                    ); //campo => parametro de la function
    $this->db->insert( 'ordenes',$insertar );  //INSERT INTO ordenes ($insertar)
    $orden_id = $this->db->insert_id();     //VALUES (id de la ultima insercicon => campo autonumerico)
// =====================================================
    //------------ crear el detalle de la orden---------------
    $this->db->reset_query();
    $items = explode( ',', $data['items'] );  // separar string y convertirlo en un arreglo
    //$dataP = explode(',',$data['cantidad']);
    $dataP = explode(',', $data['cantidad']);

    $dataU = explode(',', $data['precio_compra']);
    //barrido de cada item para insertarlo independientemente

//ITErANDO " ARRAYS EN UN FOREACH ==> recuerda q un foreach itera en un solo array x eso combinamos nuestros arrays"
    foreach( array_combine($items, $dataP) as $producto_id => $cantidad ){
      $data_insertar = array( 'producto_id' => $producto_id,
                              'orden_id'=>$orden_id ,
                              'cantidad'=>$cantidad

                            );

      $this->db->insert('ordenes_detalle', $data_insertar);


    }
    /*foreach ($dataU as $value) {
      $data=array('unitPrice'=>$value);

        $this->db->insert('ordenes_detalle', $data)  ;
    }
*/



    // ORDENES_DETALLE
    $respuesta = array(
                  'error' => FALSE,
                  'orden_id' => $orden_id
                );


    $this->response( $respuesta );



  }



  public function obtener_pedidos_get($token = "0", $id_usuario ="0" ){

    if( $token == "0" || $id_usuario == "0" ){
      $respuesta = array(
                    'error' => TRUE,
                    'mensaje'=> "Token invalido y/o usuario invalido."
                  );
      $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
      return;
    }

    $condiciones = array('id' => $id_usuario, 'token'=> $token );
    $this->db->where( $condiciones );
    $query = $this->db->get('login');

    $existe = $query->row();

    if( !$existe ){
      $respuesta = array(
                    'error' => TRUE,
                    'mensaje'=> "Usuario y Token incorrectos"
                  );
      $this->response( $respuesta );
      return;
    }
    // SUCESFULL  existe usuario y token iguales
    // Retornar todas las ordenes del usuario2
    $query = $this->db->query("SELECT * FROM ".'ordenes'." where usuario_id = ". $id_usuario ." ");

    $ordenes = array(); // almacenece en este array

    foreach( $query->result() as $row ){

      $query_detalle = $this->db->query("SELECT a.orden_id, b.m_product_id, 23.23 as value,
        b.name, 'Esta es la descripcion del producto.' as description,a.*,c.* FROM ".'ordenes_detalle'." a
        inner join m_product b on a.producto_id = b.m_product_id
        inner join ordenes c ON c.id = a.orden_id
        where orden_id = ". $row->id." " );

      $orden = array(
          'id' => $row->id,
          'creado_en' => $row->creado_en,
          'nombre'=>$row->nombre,
          'total'=>$row->total,
          'subtotal'=>$row->subtotal,
          'ivatotal'=>$row->ivatotal,
          'detalle' => $query_detalle->result()
        );

      array_push( $ordenes, $orden );

    }

    $respuesta = array(
                  'error' => FALSE,
                  'ordenes'=> $ordenes
                );


      $this->response( $respuesta );

  }


  public function borrar_pedido_delete( $token = "0", $id_usuario = "0", $orden_id = "0" ){

    if( $token == "0" || $id_usuario == "0" || $orden_id == "0" ){
      $respuesta = array(
                    'error' => TRUE,
                    'mensaje'=> "Token invalido y/o usuario invalido."
                  );
      $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
      return;
    }

    $condiciones = array('id' => $id_usuario, 'token'=> $token );
    $this->db->where( $condiciones );
    $query = $this->db->get('login');

    $existe = $query->row();

    if( !$existe ){
      $respuesta = array(
                    'error' => TRUE,
                    'mensaje'=> "Usuario y Token incorrectos"
                  );
      $this->response( $respuesta );
      return;
    }

    // Verificar si la orden es de ese usuario
    $this->db->reset_query();
    $condiciones = array('id' => $orden_id, 'usuario_id'=> $id_usuario);
    $this->db->where( $condiciones );
    $query = $this->db->get( 'ordenes' );

    $existe = $query->row();

    if( !$existe ){
      $respuesta = array(
                    'error' => TRUE,
                    'mensaje'=> "Esa orden no puede ser borrada"
                  );
      $this->response( $respuesta );
      return;
    }

    // Todo esta BIEN!
    $condiciones = array( 'id' => $orden_id );
    $this->db->delete( 'ordenes', $condiciones );

    $condiciones = array('orden_id' => $orden_id );
    $this->db->delete( 'ordenes_detalle', $condiciones );

    $respuesta = array(
              'error' => FALSE,
              'mensaje'=>'Orden eliminada'
          );

    $this->response( $respuesta );

  }



}
