import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Config } from '../types/config';
import { Movie } from '../types/movie';
import { of, switchMap, tap } from 'rxjs';

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
    const config = this.baseURL() === '' ? this.loadConfig() : of();
    return config.pipe(
      switchMap(() => this.http.get<Movie[]>(`/api/query?query=${query}&page=${page}`)),
      tap((movies) => {
        this.movies.set(movies);
      }),
    );
  }

  getImageURL(size: string, imageURLEnd: string) {
    if (this.movies().length === 0) return '';
    if (!this.imageSizes().includes(size)) throw { reason: 'that is not a valid image size' };
    return `${this.baseURL()}${size}${imageURLEnd}`;
  }
}
