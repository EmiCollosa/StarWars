import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosService } from '../Services/productos.service';

interface Character {
  name: string;
  species: string;
  films: string[];
  mass: number;
  quantity: number;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  characters: any[] = [];

  constructor(
    private http: HttpClient,
    public productosService: ProductosService
  ) {}

  ngOnInit() { //e realiza una solicitud HTTP a la API para obtener los datos de los personajes. 
    this.http.get('https://swapi.dev/api/people').subscribe((response: any) => {
      response.results.slice(0, 6).forEach((characterResponse: any) => {
        const character: Character = {
          name: characterResponse.name,
          species: '',
          films: [],
          mass: characterResponse.mass,
          quantity: 1,
        };
        this.http
          .get(characterResponse.species[0])
          .subscribe((speciesResponse: any) => {
            character.species = speciesResponse.name;
          });
        characterResponse.films.forEach((filmUrl: string) => {
          this.http.get(filmUrl).subscribe((filmResponse: any) => {
            character.films.push(filmResponse.title);
          });
        });
        this.characters.push(character);
      });
    });
  }

  anadirProducto(characters: any) {
    this.productosService.addToCart(characters);
  }
}