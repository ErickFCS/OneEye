import { Component, computed, inject, signal } from '@angular/core';
import { Tmdb } from '../../services/tmdb';
import { take } from 'rxjs';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  private tmdbService = inject(Tmdb);

  imageURL = signal('');
  backgroundImageStyle = computed(() => `url(${this.imageURL()})`);

  ngOnInit() {
    this.tmdbService
      .search('', Math.floor(Math.random() * 20) + 1)
      .pipe(take(1))
      .subscribe((movies) => {
        let targetSize = this.tmdbService.imageSizes().at(-1);
        let targetMovie = movies.at(Math.floor(Math.random() * movies.length))?.imageURLEnd;
        if (!targetSize || !targetMovie) return;
        let targetMovieImageURL = this.tmdbService.getImageURL(targetSize, targetMovie);
        if (!targetMovieImageURL) return;
        this.imageURL.set(targetMovieImageURL);
      });
  }
}
