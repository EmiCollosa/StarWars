import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../Services/productos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  listaProductos!: any;
  totalPrice: number = 0;
  totalprodu: number = 0;
  quantity: number = 0;
  character: any;
  precioTotal: any;
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
  calcularPrecio(quantity: any, character: any) {
    console.log(character);
    character.quantity = quantity.target.value;
    this.productosService.getTotalProdu(character);
  }
  precioTotalCarrito() {
    this.precioTotal = this.productosService.getTotalPrice();
  }
}