let LISTA_DE_LA_COMPRA;
let LISTA_VACIA;
let IMAGENES;

window.onload = () => {
        LISTA_DE_LA_COMPRA = document.getElementById("la-lista");
        LISTA_VACIA = document.getElementById("lista-vacia");
        IMAGENES = document.getElementById("acceso-rapido").children;

        for(let i = 0; i < IMAGENES.length; i++) {
                IMAGENES[i].addEventListener("mouseover", () => {
                        IMAGENES[i].classList.add("seleccionado");
                });
                IMAGENES[i].addEventListener("mouseout", () => {
                        IMAGENES[i].classList.remove("seleccionado");
                });
                IMAGENES[i].addEventListener("click", () => {
                        ocultarListaVacia();
                        insertarProductoEnLista(IMAGENES[i].getAttribute("alt"));
                });
        }

        document.getElementById("boton-insertar").addEventListener("click", insertarProducto);
        document.getElementById("boton-borrar-ultimo").addEventListener("click", borrarProducto);
        document.getElementById("boton-borrar-todo").addEventListener("click", borrarTodosProductos);
}

function ocultarListaVacia() {
        LISTA_VACIA.classList.remove("esVisible");
}

function mostrarListaVacia() {
        LISTA_VACIA.classList.add("esVisible");
}

function borrarProducto() {

        if (!LISTA_DE_LA_COMPRA.hasChildNodes()) return;

        LISTA_DE_LA_COMPRA.removeChild(LISTA_DE_LA_COMPRA.lastElementChild);

        if(LISTA_DE_LA_COMPRA.hasChildNodes()) return;
        
        mostrarListaVacia();
}

function borrarTodosProductos() {
        LISTA_DE_LA_COMPRA.innerHTML = "";

        mostrarListaVacia();
}

function insertarProductoEnLista(nombre) {
        let nuevo_producto = document.createElement("li");
        
        nuevo_producto.innerHTML = "<input class='marcar-comprado' type='checkbox'/><span class='producto'></span><img class='icono-borrar' src='img/delete-icon.png' alt='Borrar'>";
        nuevo_producto.appendChild(document.createTextNode(nombre));

        let marcar_comprado = nuevo_producto.querySelector(".marcar-comprado");
        let icono_borrar = nuevo_producto.querySelector(".icono-borrar");

        marcar_comprado.addEventListener("click", () => {
                
                if(marcar_comprado.checked) {
                        marcar_comprado.parentNode.classList.add("comprado")
                }
                else {
                        marcar_comprado.parentNode.classList.remove("comprado")
                }
        });

        icono_borrar.addEventListener("click", () => {
                icono_borrar.parentNode.remove();

                if(LISTA_DE_LA_COMPRA.hasChildNodes()) return;

                mostrarListaVacia();
        });
        
        LISTA_DE_LA_COMPRA.appendChild(nuevo_producto);
}

function insertarProducto() {
        ocultarListaVacia();
        insertarProductoEnLista(document.getElementById("texto-producto").value);
}