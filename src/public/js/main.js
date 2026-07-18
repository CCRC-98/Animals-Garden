$(document).ready(function(){

	/*Mostrar ocultar area de notificaciones
	$('.btn-Notification').on('click', function(){
        var ContainerNoty=$('.container-notifications');
        var NotificationArea=$('.NotificationArea');
        if(NotificationArea.hasClass('NotificationArea-show')&&ContainerNoty.hasClass('container-notifications-show')){
            NotificationArea.removeClass('NotificationArea-show');
            ContainerNoty.removeClass('container-notifications-show');
        }else{
            NotificationArea.addClass('NotificationArea-show');
            ContainerNoty.addClass('container-notifications-show');
        }
    });*/
	
    /*Mostrar ocultar menu principal*/
    $('.btn-menu').on('click', function(){
    	var navLateral=$('.navLateral');
    	var pageContent=$('.pageContent');
    	var navOption=$('.navBar-options');
    	if(navLateral.hasClass('navLateral-change')&&pageContent.hasClass('pageContent-change')){
    		navLateral.removeClass('navLateral-change');
    		pageContent.removeClass('pageContent-change');
    		navOption.removeClass('navBar-options-change');
    	}else{
    		navLateral.addClass('navLateral-change');
    		pageContent.addClass('pageContent-change');
    		navOption.addClass('navBar-options-change');
    	}
    });
    /*Salir del sistema*/
    $('.btn-exit').on('click', function(){
    	swal({
		  	title: 'Estas seguro de salir de la sesion?',
		 	text: "Si cierras tu sesion saldras del sistema",
		  	type: 'warning',
		  	showCancelButton: true,
		  	confirmButtonText: 'Salir',
		  	closeOnConfirm: false
		},
		function(isConfirm) {
		  	if (isConfirm) {
		    	window.location='/signIn/logout'; 
		  	}
		});
    });

	

	



	/* VALIDACION DE CAMPOS DE REGISTRO VETERINARIOS Y USUARIOS*/
	$('form').on('submit', function(event) {
        var dni = $('input[name="dni"]');
        var tp_dni = $('select[name="tp_dni"]');
        var nombre = $('input[name="nombre"]');
        var apellido = $('input[name="apellido"]');
        var direccion = $('input[name="direccion"]');
        var telefono = $('input[name="telefono"]');
        var correo = $('input[name="correo"]');
        var clave = $('input[name="clave"]');
		

        // Comprueba si los campos están vacíos
        if (dni.val() === '' || tp_dni.val() === '' || nombre.val() === '' || apellido.val() === '' || direccion.val() === '' || telefono.val() === '' || correo.val() === '' || clave.val() === '' /* etc... */) {
            // Si alguno de los campos está vacío, muestra un mensaje de error y evita que se envíe el formulario
            alert('No se puede realizar el registro debido a que algunos campos están incompletos');
            event.preventDefault();
        }
    });

	/* VALIDACION DE CAMPOS DE REGISTRO DE LA MASCOTA */
		$('form').on('submit', function(event){
			var nombre = $('input[name="nombre"]');
			var especie = $('input[name="especie"]');
			var raza = $('input[name="raza"]');
			var edad = $('input[name="edad"]');
			var sexo = $('select[name="sexo"]');
			var propietario = $('input[name="propietario"]');

			// Aqui comprobamos que no se encuentre ningun campo sin rellenar
			if (nombre.val() ==='' || especie.val() ==='' || raza.val() ==='' || edad.val() ==='' || sexo.val() ==='' || propietario.val() ==='') {
				alert('No se puede realizar el registro debido a que algunos campos están incompletos');
				event.preventDefault();
			}
		});

		/* VALIDACION DE CAMPOS DE REGISTRO DEL HISTORIAL CLINICO */
		$('form').on('submit', function(event){
			var observacion = $('input[name="observacion"]');
			var id_servicio= $('select[name="id_servicio"]');
			

			// Aqui comprobamos que no se encuentre ningun campo sin rellenar
			if (observacion.val() ==='' || id_servicio.val() ==='' ) {
				alert('No se puede realizar el registro debido a que algunos campos están incompletos');
				event.preventDefault();
			}
		});

	/* BUSCADOR POR DNI DE LA PERSONA */
		$('#dniInput').on('keyup', function() {
			var dniValue = $(this).val().toLowerCase();
			$("#dniTable tbody tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(dniValue) > -1)
			});
		});




	


	    /*Mostrar y ocultar submenus*/
		$('.btn-subMenu').on('click', function(){
			var subMenu=$(this).next('ul');
			var icon=$(this).children("span");
			if(subMenu.hasClass('sub-menu-options-show')){
				subMenu.removeClass('sub-menu-options-show');
				icon.addClass('zmdi-chevron-left').removeClass('zmdi-chevron-down');
			}else{
				subMenu.addClass('sub-menu-options-show');
				icon.addClass('zmdi-chevron-down').removeClass('zmdi-chevron-left');
			}
		});
	});
	
	(function($){
			$(window).on("load",function(){
				$(".NotificationArea, .pageContent").mCustomScrollbar({
					theme:"dark-thin",
					scrollbarPosition: "inside",
					autoHideScrollbar: true,
					scrollButtons:{ enable: true }
				});
				$(".navLateral-body").mCustomScrollbar({
					theme:"light-thin",
					scrollbarPosition: "inside",
					autoHideScrollbar: true,
					scrollButtons:{ enable: true }
				});
			});
	})(jQuery);






