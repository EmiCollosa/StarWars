import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../Services/productos.service';

interface Product {
  name: string;
  species: string;
  films: string[];
  mass: number;
  quantity: number;
  totalPrice: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  listaProductos: Product[] = [];
  totalPrice: number = 0;
  totalprodu: number = 0;
  quantity: number = 0;
  character: Product | undefined;
  precioTotal: number | undefined;
  compraRealizada: boolean = false;

  constructor(public productosService: ProductosService) {}

  ngOnInit(): void {
    this.listaProductos = this.productosService.character;

    console.log(this.listaProductos);
    this.productosService.totalCarrito$.subscribe((data) => {
      console.log(data);
      this.totalPrice = data;
    });

    this.precioTotalCarrito();
  }

  calcularPrecio(quantity: number, character: Product): void {
    console.log(character);
    character.quantity = quantity;
    this.productosService.getTotalProdu(character);
  }

  precioTotalCarrito(): void {
    this.productosService.getTotalPrice().subscribe((totalPrice: number) => {
      this.precioTotal = totalPrice;
    });
  }
  borrarProducto(producto: Product): void {
    const index = this.listaProductos.indexOf(producto);
    if (index !== -1) {
      this.listaProductos.splice(index, 1);
    }
  }

  realizarCompra(): void {
    if (this.listaProductos.length === 0) {
      // El carrito está vacío, mostrar mensaje de error
      this.compraRealizada = false;
    } else {
      // Realizar la compra

      // Limpiar el carrito
      this.listaProductos = [];

      // Reiniciar los totales y la cantidad
      this.totalPrice = 0;
      this.totalprodu = 0;
      this.quantity = 0;

      // Marcar la compra como realizada
      this.compraRealizada = true;
    }
  }

  aumentarCantidad(character: Product): void {
    character.quantity++;
    character.totalPrice = character.quantity * character.mass;
  }

  disminuirCantidad(character: Product): void {
    if (character.quantity > 1) {
      character.quantity--;
      character.totalPrice = character.quantity * character.mass;
    }
  }
}