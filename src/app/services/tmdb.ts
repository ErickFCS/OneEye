import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Config } from '../types/config';
import { Movie } from '../types/movie';

@Injectable({
  providedIn: 'root',
})
export class Tmdb {
  private http = inject(HttpClient);
  baseURL = signal('');
  imageSizes = signal<string[]>([]);
  movies = signal<Movie[]>([]);

  loadConfig() {
    this.http.get<Config>('/api/config').subscribe((config) => {
      this.baseURL.set(config.baseURL);
      this.imageSizes.set(config.imageSizes);
    });
  }

  search(query?: string, page?: number) {
    if (this.baseURL() === '') this.loadConfig();
    this.http.get<Movie[]>(`/api/query?query=${query}&page=${page}`).subscribe((movies) => {
      this.movies.set(movies);
    });
  }

  getImageURL(size: string, imageURLEnd: string) {
    if (this.movies().length === 0) return '';
    if (!this.imageSizes().includes(size)) throw { reason: 'that is not a valid image size' };
    return `${this.baseURL()}${size}${imageURLEnd}`;
  }
}
