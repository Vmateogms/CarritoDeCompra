class Carrito {
    constructor(productos) {
        this.productos = productos || [];
    }
    
    actualizarUnidades(sku, unidades, precio) {

        // si el numero introducido es negativo se detectara como un 0 , simple pero importante
        if (unidades < 0 ) {
            unidades = 0;
        }
        // Encontrar el producto por SKU y actualizar
        const producto = this.productos.find(p => p.sku === sku);
        if (producto) {
            producto.cantidad = unidades; // Actualiza la cantidad
        } else {
            // si no está, lo añade
            this.productos.push({ sku, cantidad: unidades, precio }); // almacena el SKU, cantidad y precio
        }
    }

    obtenerInformacionProducto(sku) {
        return this.productos.find(p => p.sku === sku) || null; // Devuelve el producto o null si no lo encuentra
    }

    obtenerCarrito() {
        // calcular el total y devolver detalles
        const total = this.productos.reduce((sum, p) => {
            return sum + (p.precio * p.cantidad); // usa el precio del producto
        }, 0);

        return {
            total: total.toFixed(2), // dos decimales
            currency: "€",
            productos: this.productos
        };
}
}
