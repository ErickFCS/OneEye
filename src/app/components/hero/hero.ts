import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  imageURL = signal('/back.png');
  backgroundImageStyle = computed(() => `url(${this.imageURL()})`);
}
