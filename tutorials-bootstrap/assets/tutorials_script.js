//console.log('desde tutorials_script');
console.log(data_php.url_blog);

jQuery(function ($) {

//inicializamos variables
$titulo_modal='';
$excerpt_modal='';
$imagen_modal='';

//funcion que mostrará un modal bootstrap con el contenido creado
function mostrarModal(titulo_modal, excerpt_modal, imagen_modal){

  $modal_tutorial = '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'+
    '<div class="modal-dialog" role="document">'+
    '<div class="modal-content">'+
    '<div class="modal-header">'+
    '<h5 class="modal-title" id="exampleModalLabel">Modal desde JS</h5>'+
    '<button type="button" class="close cerrar" data-dismiss="modal" aria-label="Close">'+
  	'<span aria-hidden="true">&times;</span>'+
  	'</button>'+
  	'</div>'+
  	'<div class="modal-body">'+
  	'<div class="card" style="width: 18rem;">'+
  	'<img class="card-img-top" src="'+imagen_modal+'" alt="'+titulo_modal+'">'+
  	'<div class="card-body">'+
  	'<h5 class="card-title">'+titulo_modal+'</h5>'+
  	'<p class="card-text">'+excerpt_modal+'</p>'+
  	'</div>'+
  	'</div>'+
  	'</div>'+
  	'<div class="modal-footer">'+
  	'<button type="button" class="btn btn-secondary cerrar" data-dismiss="modal">Cerrar</button>'+
  	'</div>'+
  	'</div>'+
  	'</div>'+
    '</div>';
  //Mostramos modal
  $($modal_tutorial).modal('show');
  //controlamos cerrar modal
  $('.cerrar').on('click',function(e){
    //console.log('cerrar');
    e.preventDefault();
    $($modal_tutorial).remove();
  });

}

//controlamos hacer click en nuestro item en elementor
$('.trigger_modal a').on('click', function(e){
  e.preventDefault();
  //console.log(e);
 	//recuperamos enlace
 	$link_indicado = $(this).attr('href');
 	//console.log($link_indicado);
 	
  //le quitamos en enlace en el frontend y empezamos a trabajarlo
 	$(this).attr('href','');
 	
  //llamamaos a la funcion consultarPost y le pasamos el link del contenido que queremos cargar dentro del modal
  consultarPost($link_indicado);
 });

//function que consulta la REST API de wordpress para traer el contenido de la entrada que le indicamos
function consultarPost(url_post){
  	//recortamos la url para quedarnos con el slug y hacer la busqueda en la rest api de wordpress
  	//http://localhost/tutorials/wp-json/wp/v2/posts?slug=superfry
  	//console.log(url_post);
  	
    //cortamos la ultima barra
  	$mi_slug = url_post.slice(0, -1);
  	//buscamos la ultima barra
  	console.log('Ultima barra cortada: '+$mi_slug);
  	$inicio_slug = $mi_slug.lastIndexOf("/");
  	console.log('Posición ultima barra antes del slug: '+$inicio_slug);
  	//cortamos desde ahi al final para quedarnos con el slug
  	$slug_dado = $mi_slug.substr($inicio_slug);
  	console.log('Slug cortado: '+$slug_dado);
  	$slug_formateado = $slug_dado.substr(1);
  	console.log('Slug formateado: '+$slug_formateado);
    //montamos la url a pedir, con la variable pasada desde functions, encadenando REST API url y slug finalmente.
  	$url_site_rest_api = data_php.url_blog + '/wp-json/wp/v2/posts?slug='+$slug_formateado;
    console.log('Peticion a la url: '+$url_site_rest_api);
    //hacemos la petición fetch
    fetch($url_site_rest_api)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
        console.log(datos);
        console.log(datos[0]);
        console.log(datos[0]['title']['rendered']);
        console.log(datos[0]['excerpt']['rendered']);
        console.log(datos[0]['featured_media_src_url']);
        // fimg_url, title, link, excerpt
        $titulo_modal = datos[0]['title']['rendered'];
        $excerpt_modal = datos[0]['excerpt']['rendered'];
        $imagen_modal = datos[0]['featured_media_src_url'];

        mostrarModal($titulo_modal,$excerpt_modal,$imagen_modal);
        
      })
      .catch(error => console.log(error)); 
  }

});