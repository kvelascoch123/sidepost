<?php
defined('BASEPATH') OR exit('No direct script access allowed');
include(APPPATH.'/libraries/httpful.phar');


class Xml extends CI_Controller {


	public function index()
	{

     //cargandop la base
     $this->load->database();

/*
     $query=$this->db->query("SELECT a.customer_id, a.usuario_id, a.total, a.ivatotal,
a.nombre, a.apellido, a.bp_category, a.email, a.direccion,
a.subtotal, a.creado_en, a.tax_id, a.telefono,
b.id, b.orden_id, b.producto_id, b.cantidad,
c.pricelist, c.pricestd, c.pricelimit FROM ordenes a
inner join ordenes_detalle b ON  b.orden_id = a.id
inner join m_productprice c On c.m_product_id = b.producto_id
WHERE c.pricelist !=0");

$var =$query->result() ;
$result=pg_query( "SELECT a.customer_id, a.usuario_id, a.total, a.ivatotal,
a.nombre, a.apellido, a.bp_category, a.email, a.direccion,
a.subtotal, a.creado_en, a.tax_id, a.telefono,
b.id, b.orden_id, b.producto_id, b.cantidad,
round(c.pricelist,2), c.pricestd, c.pricelimit, d.*  FROM ordenes a
inner join ordenes_detalle b ON  b.orden_id = a.id
inner join m_productprice c On c.m_product_id = b.producto_id
inner join config_app d ON d.id = a.id_pk_customer
WHERE c.pricelist !=0 AND a.customer_id is not null");

*/

$query=$this->db->query("SELECT '0335FD18E3D445EE8FB8C08CE0204995' as id_customer, a.usuario_id, a.total, a.ivatotal,
a.nombre, a.apellido, a.bp_category, a.email, a.direccion,
a.subtotal, a.creado_en, a.tax_id, a.telefono,
b.id, b.orden_id, b.producto_id, b.cantidad,
round(c.pricelist,2) as pricelist_a, c.pricestd, c.pricelimit, d.*  FROM ordenes a
inner join ordenes_detalle b ON  b.orden_id = a.id
inner join m_productprice c On c.m_product_id = b.producto_id
inner join config_app d ON d.id = a.id_pk_customer
WHERE c.pricelist !=0 AND a.customer_id is not null
and (a.date_hours in (SELECT MAX(date_hours) from ordenes where customer_id = a.customer_id))");

$var =$query->result() ;
$result=pg_query( "SELECT '0335FD18E3D445EE8FB8C08CE0204995' as id_customer, a.usuario_id, a.total, a.ivatotal,
a.nombre, a.apellido, a.bp_category, a.email, a.direccion,
a.subtotal, a.creado_en, a.tax_id, a.telefono,
b.id, b.orden_id, b.producto_id, b.cantidad,
round(c.pricelist,2) as pricelist_a, c.pricestd, c.pricelimit, d.*  FROM ordenes a
inner join ordenes_detalle b ON  b.orden_id = a.id
inner join m_productprice c On c.m_product_id = b.producto_id
inner join config_app d ON d.id = a.id_pk_customer
WHERE c.pricelist !=0 AND a.customer_id is not null
and (a.date_hours in (SELECT MAX(date_hours) from ordenes where customer_id = a.customer_id))");

//echo json_encode($var) ;
/*$var1;
foreach($query->result() as $row){
$var1=$row->creado_en;

}
echo $var1;*/
$var1;  // FECHA
$var2;  // Customer_id
$var3;  //id_organization
$var4;	///user1
$var5;  //dtipod_doc
$var6;  //id_doc_ord
$var7;  //id_doc_shipment
$var8;  //pay_met
$var9;	//pay_term
$var10; //costcenter
$var11; //user1
$var12; //user2
$var13; //warehouse

if ($row=pg_fetch_array($result)) {
$var1 = $row[10];
$var2=$row[0];
$var3=$row[20];
$var4=$row[21];
$var5=$row[22];
$var6=$row[23];
$var7=$row[24];
$var8=$row[25];
$var9=$row[26];
$var10=$row[27];
$var11=$row[28];
$var12=$row[29];
$var13=$row[30];



}


    $xmlDoc = new DOMDocument ();

    // crea el elemento raíz
    //abuelo
    $root = $xmlDoc-> appendChild (
              $xmlDoc-> createElement ("invoiceSaleXML"));
              //padre
              $tutTag = $root-> appendChild (
                 $xmlDoc-> createElement ("invoiceSale"));

                 //hijos  atributos
                /* $tutTag-> appendChild (
                   $xmlDoc-> createAttribute ("author")) -> appendChild (
                     $xmlDoc-> createTextNode ("Datos del Customer"));
                      */
                     // hijos de los hijos (ELEMENTOS)
                   $tutTag-> appendChild (
                   $xmlDoc-> createElement ("idOrganization", $var3));


                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("user", " "));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("documentType", $var4));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("idDocOrder", $var5));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("idDocShipment", $var6)); //


                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("isRefund", "N"));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("isNotCred", "N"));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("IdRefundNCR", "NA"));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("invoiceDate", "2018-04-17")); //$var1

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("idCustomer", $var2));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("paymentMethod"," "));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("description", "PEDIDO: K33606"));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("paymentTerm", " ")); //$var9

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("priceList", " "));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("eeiEdocument", "Y"));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("spseiOrderCode", " "));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("spseiLiquidationCode", " "));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("spseiReferenceDecosc", " "));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("costCenter"," "));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("user1", $var11));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("user2", $var12));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("warehouse", $var13));

                        $tutTag-> appendChild (
                        $xmlDoc-> createElement ("einvoiceBlock", "N"));
    //=====================================================line
    foreach($query->result() as $row){


                        $catTag = $tutTag-> appendChild (
                        $xmlDoc-> createElement ("line"));
                          //AQUI EL FOREACH
                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("description", " "));

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("orderDate", $row->creado_en));

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("product","9781C2141C7542BBB22676AABB7115CB")); // $row->producto_id

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("priceList",$row->pricelist_a));

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("unitPrice", $row->pricelist_a));

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("priceLimit", $row->pricelimit));

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("quantity", "$row->cantidad"));

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("discount", "0"));

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("tax", "49ACE25D98164D2496062AF72FE972BE")); //$row->tax_id

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("warehouse", $var13));

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("costCenter", $row->pricelist_a));

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("user1", $row->usuario_id));

                          $catTag-> appendChild (
                          $xmlDoc-> createElement ("user2", $var12));
}
    // hace que el resultado sea bastante
    $xmlDoc-> formatOutput = true;
  // echo $xmlDoc-> saveXML ();
	 $strings_xml = $xmlDoc->saveXML();

		$xmlDoc->save('g_xml.xml');  // GENERA EL ARCHIVO XML
	//	========================================================




			$openbravo_ws="http://localhost/bmajustes/ws/ec.com.sidesoft.external.interfaces.setInvoiceSale";
			$openbravo_user="Openbravo";
			$openbravo_passwd="openbravo";


			$response = \Httpful\Request::post($openbravo_ws)
		->body($strings_xml)
		->authenticateWith($openbravo_user, $openbravo_passwd)
		->sendsXml()
		->send();

	$xmlDoc = simplexml_load_string($response);

	$WS_c_invoice_id=(string)$xmlDoc->idTransaccion;
	$WS_documentno= (string)$xmlDoc->numeroDocumento;
	$WS_ride= (string)$xmlDoc->urlRIDE;
	$WS_mensaje=(string)$xmlDoc->mensaje;
	$WS_estatus=(string)$xmlDoc->estatus;

	//echo $WS_mensaje; exit;
	echo $WS_c_invoice_id.'<br>';
	echo $WS_documentno.'<br>';
	echo $WS_estatus.'<br>';
	echo $WS_mensaje.'<br>';
	echo $WS_ride.'<br>';

/*
	// REVISE LO Q SE ENVIO AL WEB SERVICE
        $auth = base64_encode("Openbravo:openbravo");
        $context = stream_context_create(['http' => ['header' => "Authorization: Basic $auth"]]);
        $res = file_get_contents($openbravo_ws,false,$context);

        if ($res) {
        //	echo $data;
          echo $res;

      }
			*/
	}





	public function abrir(){
		$server = 'http://localhost/bmajustes/ws/ec.com.sidesoft.external.interfaces.setInvoiceSale';
		$auth = base64_encode("Openbravo:openbravo");
		$context = stream_context_create(['http' => ['header' => "Authorization: Basic $auth"]]);

  //  $server = 'http://186.69.209.150:8030/restA/curl_post';
		$res = file_get_contents($server, false, $context);

		echo $res;
	}
}
?>
