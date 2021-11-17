/* --------------------------------------------------- */
/*                VARIABLES GLOBALES                   */
/* --------------------------------------------------- */
let listaProductos = [
   { nombre: 'Placard', cantidad: 2, precio: 1112.34 },
   { nombre: 'Puerta', cantidad: 3, precio: 1034.56 },
   { nombre: 'Reloj', cantidad: 4, precio: 156.78 },
   { nombre: 'Mesa', cantidad: 5, precio: 1778.90 }
]

let crearLista = true; //Creo Bandera
let ul;

/* --------------------------------------------------- */
/*                FUNCIONES GLOBALES                   */
/* --------------------------------------------------- */
function borrarProd(index) {
    console.log('borrarProd', index);

    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    listaProductos.splice(index, 1);
    renderLista();
}

function cambiarCantidad(index, el) {
  let cantidad = parseInt(el.value);
  console.log('cambiarCantidad', index, cantidad);

  listaProductos[index].cantidad = cantidad;
}

function cambiarPrecio(index, el) {
  let precio = Number(el.value);
  console.log('cambiarPrecio', index, precio);

  listaProductos[index].precio = precio;
}


function renderLista() {
    console.log('Render Lista');

    if(crearLista) {
        ul = document.createElement('ul');
        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100');
    }

    ul.innerHTML = '';

    listaProductos.forEach( (prod, index) => {
        ul.innerHTML += `
        <li class="mdl-list__item">

          <!-- Icono del producto -->
          <span class="mdl-list__item-primary-content w-10">
            <i class="material-icons mdl-list__item-icon">shopping_cart</i>
          </span>

          <!-- Nombre del producto -->
          <span class="mdl-list__item-primary-content w-30">
            ${prod.nombre}
          </span>

          <!-- Cantidad del producto -->
          <span class="mdl-list__item-primary-content w-20">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input onchange="cambiarCantidad(${index}, this)" class="mdl-textfield__input" type="text" id="cantidad-${index}" value="${prod.cantidad}">
              <label class="mdl-textfield__label" for="cantidad-${index}">Cantidad</label>
            </div>
          </span>

          <!-- Precio del producto -->
          <span class="mdl-list__item-primary-content w-20 ml-item">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input onchange="cambiarPrecio(${index}, this)" class="mdl-textfield__input" type="text" id="precio-${index}" value="${prod.precio}">
              <label class="mdl-textfield__label" for="precio-${index}">Precio($)</label>
            </div>
          </span>

          <!-- Acción (borrar producto) -->
          <span class="mdl-list__item-primary-content w-20">
            <button onclick="borrarProd(${index})" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
              <i class="material-icons">delete</i>
            </button>
          </span>

        </li>
      `;
    })
    
    if(crearLista) {
        document.getElementById('lista').appendChild(ul);
    } else {
        componentHandler.upgradeElements(ul);
    }

    crearLista = false; //bandera
}

/* --------------------------------------------------- */
/*                Listeners                            */
/* --------------------------------------------------- */

function configurarListeners() {
  /* Ingreso del producto nuevo */
  document.getElementById("btn-entrada-producto").addEventListener('click', () => {
    console.log("btn-entrada-producto");

    let input = document.getElementById('ingreso-producto');
    let producto = input.value;

    if(producto) {
      listaProductos.push({ nombre: producto, cantidad: 1, precio: 0});
      renderLista();
      input.value = null;
    }

  });

  /* Borrado total de productos */

  document.getElementById('btn-borrar-productos').addEventListener('click', () => {
    console.log('btn-borrar-productos');

    if(confirm('¿Desea borrar todos los productos?')) {
      listaProductos = [];
      renderLista();
    }
  });
}


function start() {
    console.log('Lista Productos');

    configurarListeners();
    renderLista();
}

/* --------------------------------------------------- */
/*                     EJECUCIÓN                       */
/* --------------------------------------------------- */

start();