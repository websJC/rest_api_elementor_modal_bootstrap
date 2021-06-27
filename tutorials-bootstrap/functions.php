<?php 

//ponemos en cola estilos theme padre
function tutorials_bootstrap_enqueue_styles() {
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' ); 
} 

add_action( 'wp_enqueue_scripts', 'tutorials_bootstrap_enqueue_styles' );


function my_scripts_method() {
	//ecolamos jquery
    wp_enqueue_script('jquery');
	//registramos script
    wp_register_script(
        'tutorials-script',
        get_stylesheet_directory_uri() . '/assets/tutorials_script.js');
    //Creamos el array de datos a pasarle de php a js
    $data = array( 
    	'url_blog' => get_site_url() 
    );
    //ponemos script en cola
    wp_enqueue_script(
        'tutorials-script',
        get_stylesheet_directory_uri() . '/assets/tutorials_script.js',
        array( 'jquery' )
    );
    //utilizamos localize script para enviarle los datos
     wp_localize_script( 'tutorials-script', 'data_php', $data );


}

add_action( 'wp_enqueue_scripts', 'my_scripts_method' );