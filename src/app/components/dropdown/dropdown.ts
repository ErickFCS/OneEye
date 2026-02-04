import { Component, input, output } from '@angular/core';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  matches = input<Movie[]>([]);
  itemSelected = output<Movie>();
  onItemClick(movie: Movie) {
    console.log("You clicked me")
    this.itemSelected.emit(movie);
  }
}
