import { Component, computed, inject, signal } from '@angular/core';
import { Tmdb } from '../../services/tmdb';
import { take } from 'rxjs';
import { TargetMovie } from '../../services/target-movie';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  private tmdbService = inject(Tmdb);
  private targetMovie = inject(TargetMovie);

  imageURL = signal('');
  backgroundImageStyle = computed(() => `url(${this.imageURL()})`);

  ngOnInit() {
    this.tmdbService
      .search('', Math.floor(Math.random() * 20) + 1)
      .pipe(take(1))
      .subscribe((movies) => {
        let targetSize = this.tmdbService.imageSizes().at(-1);
        let targetMovie = movies.at(Math.floor(Math.random() * movies.length));
        if (!targetSize || !targetMovie?.imageURLEnd) return;
        let targetMovieImageURL = this.tmdbService.getImageURL(targetSize, targetMovie.imageURLEnd);
        this.targetMovie.targetMovie.set(targetMovie);
        if (!targetMovieImageURL) return;
        this.imageURL.set(targetMovieImageURL);
      });
  }
}
