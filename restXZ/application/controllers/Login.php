<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once( APPPATH.'/libraries/REST_Controller.php' );
use Restserver\libraries\REST_Controller;


class Login extends REST_Controller {


  public function __construct(){

    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
    header("Access-Control-Allow-Origin: *");


    parent::__construct();
    $this->load->database();

  }

  public function index_post(){
    // Objeto data
    $data = $this->post();
    //------------- No hay correo ni contraseña Falta informacion---------------
    if(!isset( $data['correo'] ) OR !isset( $data['contrasena'] ) ){

      $respuesta = array(
                      'error' => TRUE,
                      'mensaje'=> 'La información enviada no es válida'
                    );
      $this->response( $respuesta, REST_Controller::HTTP_BAD_REQUEST );
      return;
    }

    //-------------------------------------------------------------------

    // ****** Tenemos correo y contraseña en un post  ******

    $condiciones = array('correo' => $data['correo'],
                         'contrasena'=>$data['contrasena'] );

    $query = $this->db->get_where('login', $condiciones );

    $usuario = $query->row(); // variable q alacena si existio en la DB informacion

    // VALIDACION
    // No se encontro en la DB
    if( !isset( $usuario ) ){
      $respuesta = array(
                      'error' => TRUE,
                      'mensaje'=> 'Usuario y/o contrasena no son validos'
                    );
      $this->response( $respuesta );
      return;
    }

    //*********** AQUI!, tenemos un usuario y contraseña********

    // TOKEN
    // $token = bin2hex( openssl_random_pseudo_bytes(20)  );  // SIEMPRE Q PASE UN LOGIN  PHP5 o superior
    $token = hash( 'ripemd160', $data['correo'] );  //token apartir del correo

    // Guardar en base de datos el token
    $this->db->reset_query();    // limpiar las condiciones del query ""get_where"" login
    $actualizar_token = array( 'token' => $token );
    $this->db->where( 'id', $usuario->id );   //usuario = query->row => aki esta id y correo

    $hecho = $this->db->update( 'login', $actualizar_token );

    $respuesta = array(
                  'error' => FALSE,
                  'token' => $token,
                  'id_usuario' => $usuario->id
                );


    $this->response( $respuesta );


  }



}
