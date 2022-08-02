// NOTA(Adrian): He escrito las instrucciones de cada función en inglés para que me sea más fácil leer lo que tenía que hacer.

let LISTA_DE_LA_COMPRA;
let IMAGEN;

function borrarProducto() {
        // This function should eliminate the last element of the list. Register this function as a callback for the event produced by clicking on the delete button.

        LISTA_DE_LA_COMPRA.removeChild(LISTA_DE_LA_COMPRA.lastElementChild);
}

function insertarProducto() {
        // This function should take the value which appears in the text input and insert it as a new element at the end of the list. Remember that the content of a text block appears in the attribute value of the element. Register this function as a callback for the event produced by clicking on the add products button.

        let nuevo_producto = document.createElement("li");
        nuevo_producto.appendChild(document.createTextNode(document.getElementById("texto-producto").value));

        LISTA_DE_LA_COMPRA.appendChild(nuevo_producto);
}

function pulsarImagen() {
        // This function should add a new product to the shopping list when an image is clicked. The product that will be added is the one named in the alt attribute of the image.

        let fruta = document.createElement("li");
        fruta.appendChild(document.createTextNode(IMAGEN.getAttribute("alt")));

        LISTA_DE_LA_COMPRA.appendChild(fruta);
}

function entrarImagen() {
        // This function will give the seleccionado class to the element which the mouse is hovering over.
        IMAGEN.classList.add("seleccionado");
}

function salirImagen() {
        // This function does the inverse of what the entrarImagen function does.

        IMAGEN.classList.remove("seleccionado");
}

function registrarEventos() {
        // This function will register the events when the window is loaded

        LISTA_DE_LA_COMPRA = document.getElementById("la-lista")
        IMAGEN = document.querySelector("img");

        document.getElementById("boton-borrar").addEventListener("click", borrarProducto);
        document.getElementById("boton-insertar").addEventListener("click", insertarProducto);        
        IMAGEN.addEventListener("click", pulsarImagen);
        IMAGEN.addEventListener("mouseover", entrarImagen);
        IMAGEN.addEventListener("mouseout", salirImagen);
}

window.onload = registrarEventos;