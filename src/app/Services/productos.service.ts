import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

interface Character {
  name: string;
  species: string;
  films: string[];
  mass: number;
  quantity: number;
  totalPrice: number; //utilizando el peso del personaje como precio.
}
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  character: Character[] = [];
  private cartSubject = new BehaviorSubject<Character[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);
  public totalCarrito$ = new Subject<any>();
  constructor() {}
  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }
  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartAction$(): Observable<Character[]> {
    return this.cartSubject.asObservable();
  }

  updateCart(character: Character): void {
    this.addToCart(character);
  }

  resetCart(): void {
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    this.character = [];
  }

  public addToCart(character: Character): void {
    console.log(character);
    console.log('THIS.CHARACTER');
    console.log(this.character);
  
    const isCharacterInCart = this.character.some(
      (item) => item.name == character.name
    );
    console.log(isCharacterInCart);
    if (!isCharacterInCart) {
      character.totalPrice = character.quantity * Number(character.mass);
      this.character.push(character);
    } else {
      console.log('Ya esta en el carrito');
    }
    console.log(this.character);

    this.cartSubject.next(this.character);
  }

  updateQuantity(character: Character, quantity: 1) {
    character.quantity = quantity;
    character.mass = character.mass * quantity;
  }

  getTotalPrice() {
    const totalPrice = this.character.reduce((a, b) => a + b.totalPrice, 0);
    this.totalCarrito$.next(totalPrice);
    console.log(totalPrice);
    return this.totalCarrito$.asObservable();
  }

  getTotalProdu(character: any) {
    character.totalPrice = character.quantity * Number(character.mass);
    this.getTotalPrice();
  }
}