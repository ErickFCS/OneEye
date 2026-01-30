import { Component, computed, inject, signal } from '@angular/core';
import { Tmdb } from '../../services/tmdb';
import { combineLatest, filter, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

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
  private dataReady$ = combineLatest([
    toObservable(this.tmdbService.movies),
    toObservable(this.tmdbService.imageSizes),
    toObservable(this.tmdbService.baseURL),
  ]).pipe(
    filter(
      ([movies, imageSizes, baseURL]) =>
        movies.length > 0 && imageSizes.length > 0 && baseURL !== '',
    ),
    take(1),
  );

  ngOnInit() {
    this.tmdbService.search('', Math.floor(Math.random() * 20) + 1);
    this.dataReady$.subscribe(([movies, imageSizes]) => {
      this.imageURL.set(
        this.tmdbService.getImageURL(
          imageSizes.at(-1) || '',
          movies.at(Math.floor(Math.random() * movies.length))?.imageURLEnd || '',
        ),
      );
    });
  }
}
