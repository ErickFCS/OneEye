import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Config } from '../types/config';
import { Movie } from '../types/movie';
import { filter, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Tmdb {
  private http = inject(HttpClient);
  baseURL = signal<string>('');
  imageSizes = signal<string[]>([]);
  movies = signal<Movie[]>([]);

  loadConfig() {
    return this.http.get<Config>('/api/config').pipe(
      tap((config) => {
        this.baseURL.set(config.baseURL);
        this.imageSizes.set(config.imageSizes);
      }),
    );
  }

  search(query?: string, page?: number) {
    const config: Observable<any> = this.baseURL() === '' ? this.loadConfig() : of(null);
    return config.pipe(
      filter(() => this.baseURL() !== '' && this.imageSizes().length > 0),
      switchMap(() => this.http.get<Movie[]>(`/api/query?query=${query}&page=${page}`)),
      tap((movies) => {
        this.movies.set(movies);
      }),
    );
  }

  getImageURL(size: string | undefined, imageURLEnd: string | undefined) {
    if (!size || !imageURLEnd) return '';
    if (!this.imageSizes().includes(size)) throw new Error('that is not a valid image size');
    return `${this.baseURL()}${size}${imageURLEnd}`;
  }
}
