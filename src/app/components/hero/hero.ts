import { Component, computed, inject } from '@angular/core';
import { Tmdb } from '../../services/tmdb';
import { TargetMovie } from '../../services/target-movie';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  private tmdb = inject(Tmdb);
  private targetMovie = inject(TargetMovie).targetMovie;

  imageURL = computed(() => {
    return this.tmdb.getImageURL(this.tmdb.imageSizes().at(-1), this.targetMovie()?.imageURLEnd);
  });
  backgroundImageStyle = computed(() => `url(${this.imageURL()})`);
}
