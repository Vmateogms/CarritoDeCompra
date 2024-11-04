document.addEventListener('DOMContentLoaded', function() {

    const carrito = new Carrito();

    function cargarProductos() {
        fetch('https://jsonblob.com/api/1301520689805516800') //solicitud a la api
        .then(response => response.json()) // la respuesta de la api se convierte en json
        .then(data => { 
            data.products.forEach(producto => {
                // añadimos productos al DOM
            const tr = document.createElement('tr');  //creamos las filas de la tabla 
            tr.innerHTML = `
            <td>${producto.title}</td>
            <td><input type="number" value="0" min="0" data-sku="${producto.SKU}"></td> <!--solo puede introducir numeros y minimo 0 asi no pueden usarse numeros negativos ademas el usuario vera 0 cuando se carge la pagina -->
            <td>${producto.price}€</td>
            <td class="total-producto">0€</td>
             `;
             document.getElementById('cuerpoTabla').appendChild(tr);

                // añadir evento para actualizar el total
                const input = tr.querySelector('input[type="number"]')
                input.addEventListener('change', function() {
                    const sku = this.dataset.sku;
                    const unidades = parseInt(this.value) || 0; // nos aseguramos que si el campo esta vacio se considera como 0
                    carrito.actualizarUnidades(sku, unidades, parseFloat(producto.price));
                actualizarTotalCarrito();
                });
            });
        })
        .catch(function(error) {
            console.error('Error', error);
        });
        }



    function actualizarTotalCarrito() {
        const carritoInfo = carrito.obtenerCarrito();
        document.getElementById('totalFinal').textContent = `${carritoInfo.total}€`;

        // actualizar el total
        document.querySelectorAll('input[type="number"]').forEach(input => {
            const sku = input.dataset.sku;
            const producto = carrito.obtenerInformacionProducto(sku)

            if (producto) { //si el producto existe
                const totalProducto = (producto.precio * producto.cantidad).toFixed(2); // redondeamos por que si no deja numeros con muchos ceros ej: 499.90000000000003€
                input.closest('tr').querySelector('.total-producto').textContent = `${totalProducto}€`; //actualiza el total por cada producto en el DOM
            }
        });
    }

    cargarProductos();
})
