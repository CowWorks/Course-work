let LISTA_DE_LA_COMPRA;
let LISTA_VACIA;
let IMAGENES;


$(document).ready(function() {
        LISTA_DE_LA_COMPRA = $("#la-lista");
        LISTA_VACIA = $("#lista-vacia");
        IMAGENES = $("#acceso-rapido").children();

        for(let i = 0; i < IMAGENES.length; i++) {
                IMAGENES.eq(i).mouseover(() => {
                        IMAGENES.eq(i).addClass("seleccionado");
                });
                IMAGENES.eq(i).mouseout(() => {
                        IMAGENES.eq(i).removeClass("seleccionado");
                });
                IMAGENES.eq(i).click(() => {
                        ocultarListaVacia();
                        insertarProductoEnLista(IMAGENES.eq(i).attr("alt"));
                })
        }

        $("#boton-insertar").click(insertarProducto);
        $("#boton-borrar-ultimo").click(function() {
                LISTA_DE_LA_COMPRA.children().last().slideUp("600", borrarProducto);        
        });
        $("#boton-borrar-todo").click(borrarTodosProductos);
        $("#boton-cargar-lista").click(cargarJSON);
});

function ocultarListaVacia() {
        LISTA_VACIA.animate({width: 0}, "600", function() {
                LISTA_VACIA.removeClass("esVisible");
        });
}

function mostrarListaVacia() {
        LISTA_VACIA.addClass("esVisible");
        LISTA_VACIA.animate({width: 200}, "600");
}

function borrarProducto() {
        if (LISTA_DE_LA_COMPRA.children().length === 0) return;

        LISTA_DE_LA_COMPRA.children().last().remove();

        if(LISTA_DE_LA_COMPRA.children().length != 0) return;

        mostrarListaVacia();
}

function borrarTodosProductos() {
        LISTA_DE_LA_COMPRA.html("");

        mostrarListaVacia();
}

function insertarProductoEnLista(nombre, checked = false) {
        let nuevo_producto = $("<li>").html("<input class='marcar-comprado' type='checkbox'/><span class='producto'></span><img class='icono-borrar' src='img/delete-icon.png' alt='Borrar'>");
        
        nuevo_producto.append(nombre)

        let marcar_comprado = nuevo_producto.children(".marcar-comprado");
        let icono_borrar = nuevo_producto.children(".icono-borrar");

        marcar_comprado.prop("checked", checked)

        if(marcar_comprado.prop("checked")){
                marcar_comprado.parent().addClass("comprado");
        }

        marcar_comprado.click(function() {
                marcar_comprado.parent().toggleClass("comprado");
        });

        icono_borrar.click(function() {
                icono_borrar.parent().remove();

                if(LISTA_DE_LA_COMPRA.children().length != 0) return;

                mostrarListaVacia();
        });


        LISTA_DE_LA_COMPRA.append(nuevo_producto);
}

function insertarProducto() {
        ocultarListaVacia();
        insertarProductoEnLista($("#texto-producto").val());
}

function cargarJSON() {
        ocultarListaVacia();
        let fichero = $("#usuario").val() + ".json";
        $.getJSON(fichero)
                .done(processarJSON)
                .fail(() => alert("El fichero no existe."))
}

function processarJSON(json) {
        borrarTodosProductos();

        for(let i = 0; i < json.productos.length; i++) {
                let producto = json.productos[i];
                insertarProductoEnLista(producto.nombre, producto.comprado);
        }
}