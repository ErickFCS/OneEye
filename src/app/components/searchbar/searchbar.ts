import { Component, inject, signal } from '@angular/core';
import { Dropdown } from '../dropdown/dropdown';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Movie } from '../../types/movie';
import { Tmdb } from '../../services/tmdb';
import { debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { TargetMovie } from '../../services/target-movie';

@Component({
  selector: 'app-searchbar',
  imports: [ReactiveFormsModule, Dropdown],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css',
})
export class Searchbar {
  private tmdb = inject(Tmdb);
  private targetMovie = inject(TargetMovie);
  searchControl = new FormControl('');
  matches = signal<Movie[]>([]);
  isLoading = signal(false);

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading.set(true);
        }),
        switchMap((query) => {
          if (!query) return of([]);
          return this.tmdb.search(query);
        }),
      )
      .subscribe((matches) => {
        this.isLoading.set(false);
        this.matches.set(
          matches.map((e, i) => ({
            ...e,
            id: i,
            imageURL: this.tmdb.getImageURL(this.tmdb.imageSizes().at(0), e.imageURLEnd),
          })),
        );
      });
  }

  handleClick(movie: Movie) {
    this.targetMovie.targetMovie.set(movie)
  }
}
