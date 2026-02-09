import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.html',
  styleUrl: './rating.css',
})
export class Rating {
  stars = input<number>(0);
  classString = input<string | undefined>('');
}
