import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  imageURL = signal('https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp');
  title = signal('Movie title');
  description = signal('Movie description with a lot of text here and other thisgs');
  stars = signal(4);
  linesClamped = signal(true);

  toggleMore() {
    this.linesClamped.set(this.linesClamped() ? false : true);
  }
}
